import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { useParams } from "react-router-dom";

import Player from "@vimeo/player";

//dependencias
import * as UbicacionServer from "../../services/ubicacion";
import * as FechareproServer from "../../services/fechaRepro"
import * as HistorialUserServer from "../../services/historialUser";
import * as HistorialVideoServer from "../../services/historialVideo";

import "../../styles/styles.css";

/**
 * Función para obtener el video alojado en vimeo y mostrarlo en un iframe, también se hace la gestión del video para guardar su historial, tiempo de reproducción, etc.
 * @param {*} video
 * @returns Iframe del video en vimeo
 */
const IframeVideo =  ({video, ...props}) => {
  const [ubicacionUsers, setUbicacionUsers] = useState(null);
  const [histUser, setHistUser] = useState();
  const [histVideo, setHistVideo] = useState();
  const { id } = useParams();


  const location = useLocation();

  const iframe = document.getElementById('iframe1');
  const URL_API = 'https://ipwho.is/';

  /**
   * Función para obtener la ubicación del usuario logeado
   */
  const getUbication= async ()=> {
    await fetch(URL_API)
    .then(response => response.json())
    .then(data => {
      setUbicacionUsers(data);
    });
  };
  /**
   * Función para obtener el historial de usuario para el video en reproducción
   */
  const getHistUser= async ()=> {
   const res = await HistorialUserServer.getHistorial(location.state.id);   
   setHistUser(res);
  };

  /**
   * Función para obtener el historial del video en reproducción
   */
  const getHistorialVideo = async () => {
    const res = await HistorialVideoServer.ListHistorialVideo({video_id:id})
    if (res.length>0) {
      setHistVideo(res);
    } else {
      const formData = new FormData();
      formData.append('video',id);
      const res = await HistorialVideoServer.RegisterHistorialVideo(formData);
      setHistVideo(res);
    }
  }
  
  /**
   * Función para convertir el tiempo de reproducción del video a segundos
   * @param {time} tiempo 
   * @returns Tiempo en segundos.
   */
  const convertTime = (tiempo) => {
    let [h, m, s] = tiempo.split(':').map(val => +val);
    s = (s+(m*60)+(h*60^2))-2
    return parseInt(s);
  }

  /**
   * Función para obtener la fecha actual y pasarla a un formato YY-MM-dd
   * @returns Fecha actual
   */
  function obetenerfecha() {
    const f = new Date();
    let day = `${(f.getDate())}`.padStart(2,'0');
    let month = `${(f.getMonth()+1)}`.padStart(2,'0');
    let year = f.getFullYear();
    const fecha =year+ "-"+ month + "-" + day;
    return fecha;
  }
  /**
   * Función para realizar la gestión con el video (Guardar tiempo de reproducción, guardar calificación, guardar fecha de reproducción, guardar ubicación)
   */
  const getVimeoVideo = React.useCallback(() => {
    const formData = new FormData();
    let duracion = 0;
    let tiempo;
    let player;

    if (video.code_esp && histUser) {
      let options = {
        id: video.code_esp,
        playsinline: true,
        
      };
      player = new Player(iframe, options);

      if (histUser.tiempo !== null) {
        const segundos = convertTime(histUser.tiempo);
        player.setCurrentTime(segundos);
      }
      /**
       * Metodo play en donde se realizan las operaciones mencionadas en la función useCallback
       */
      player.on('play', async () => {
        const res = await UbicacionServer.ListUbicacionHist({ 'histUser_id': histUser.id });
        const data = new FormData();
        data.append("historial_user", histUser.id);
        data.append("historial_Video",histVideo[0].id);
        const fechaR = await FechareproServer.ListFechaReprox2(data);
        let ubByHist;
        let reproH;
        const fecha = obetenerfecha();

        if (res.length > 0) {
          ubByHist = res;
        }
        if (fechaR.length >0 ) {
          reproH = fechaR;
        }
        if (ubicacionUsers) {
          formData.append("direccionIP", ubicacionUsers.ip);
          formData.append("ciudad", ubicacionUsers.city);
          formData.append("pais", ubicacionUsers.country);
          formData.append("historial_user", histUser.id);
          formData.append("historial_Video", histVideo[0].id)
          if (ubByHist) {
            for (let index = 0; index < ubByHist.length; index++) {
              const element = ubByHist[index];
              if (element['direccionIP'] === ubicacionUsers.ip && element['ciudad'] === ubicacionUsers.city && element['pais'] === ubicacionUsers.country) {
                console.log("Ya exite una hubicación del mismo lugar registrada!");
              }
              else{
                await  UbicacionServer.RegisterUbicacion(formData);
                break;
              }
            }
          }
          else{ await  UbicacionServer.RegisterUbicacion(formData) }

          if (reproH) {
            for (let index = 0; index < reproH.length; index++) {
              const element = reproH[index];
              console.log(element['fecha']);
              if (element['fecha'] === fecha) {                
                console.log("Ya exite una fecha igual registrada!");
              }
              else{
                await  FechareproServer.RegisterFechaRepro({ 'historial_user': histUser.id, 'historial_Video':histVideo[0].id})
                break;
              }
            }
          }
          else{await  FechareproServer.RegisterFechaRepro({ 'historial_user': histUser.id, 'historial_Video':histVideo[0].id})}            
        }
      });
      /**
       * Función para contar cada 10 segundos la reproducción del video.
       * @param {*} player 
       */
      const repetirCada10Segundos = (player)=> {
        setInterval(saveTime, 10000, player);
      }
      /**
       * Función para obtener la duración del video y guardarlo en la base de datos
       * @param {*} player 
       */
      const saveTime =(player)=> {
        tiempo = 0;
        console.log("Guardado después de 10s");
        player.getDuration().then( (duration) => {
          duracion = parseInt(duration);
        }).catch(function(error) {
          console.error(error);
        });
        player.getCurrentTime().then((seconds) => {
          tiempo = parseInt(seconds)
          if (tiempo !== 0 && histUser.id){
            const validacion = parseInt((duracion*90)/100);
            console.log("Tiempo para el 90% "+validacion);
            let cont1 = histUser.counter_repro;
            let cont2 = histVideo[0].reproducciones;
            if (tiempo >= validacion) {
              cont1 += 1;
              cont2 += 1;
              HistorialUserServer.updateHistorialUser(histUser.id,{'tiempo':0, 'visto':true, 'counter_repro':cont1});
              HistorialVideoServer.updateHistorialVideo(histVideo[0].id, {'reproducciones':cont2})
            }
            else{
              console.log("Tiempo actual de reproducción "+tiempo);
              HistorialUserServer.updateHistorialUser(histUser.id,{'tiempo':tiempo});
            }
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      if (document.URL.includes('/seeVideo/')) {
        repetirCada10Segundos(player); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ histUser , iframe, ubicacionUsers, video.code_esp]);

  useEffect(()=>{    
    getVimeoVideo();
  },[getVimeoVideo]);

  useEffect(()=>{
    //getUbication();
    getHistUser();
    getHistorialVideo();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  return (
      <div id="iframe1">
      </div>
    );
}

export default IframeVideo;