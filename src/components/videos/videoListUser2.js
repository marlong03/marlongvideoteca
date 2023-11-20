import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useContext } from "react";

//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Carousel from "react-bootstrap/Carousel";

//dependencies
import VideosItem from "./videosItem";
import VideosCategoriaFila2 from "./videosCategoriaFila2";
import * as HistorialUserServer from "../../services/historialUser";
import * as PreferenciasUserServer from "../../services/preferenciasUser";
import Context from "../context/UserContext";

const useStyles = styled((theme) => ({
  root: {
    maxWidth: 1248,
    margin: "auto",
  },
  "@media (max-width: 1248px)": {
    root: {
      display: "flex",
    },
  },
}));

/**
 * Componente para organizar en las pestañas (videos, series, casos) los videos en su respectiva categoria, con un buscador y filtro
 * @param {*} videos
 * @param {*} categories
 * @returns Contenedor con los videos y categorias 
 */
function VideosListUser2({videos, categories, ...props}) {
  const history = useNavigate();

  const [histUsers, setHistUsers] = useState();
  const [prefUsers, setPrefUsers] = useState(null); 
  const [categoriasFalt, setCategoriasFalt] = useState(null);
  const { user } = useContext(Context)

  /**
   * Función para obtener el historial de los usuarios.
   */
  const getHistorialUsers = async () => {
    try {
      const res = await HistorialUserServer.ListHistorialUser({'user_id':user.id});
      setHistUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Función para obtener las preferencias de los usuarios
   */
  const getPreferenciasUser = async () => {
    try {
      const res = await PreferenciasUserServer.ListPreferenciaUser({'user_id':user.id});   
      setPrefUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getHistorialUsers();
    getPreferenciasUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /**
   * Función para organizar las categorias de videos dependiendo de las preferencias.
   */
  useEffect(() => {

    if(prefUsers && categories) {
      let array = [];
      let array1 =[];
      let array2 = [];

      for (let i = 0; i < prefUsers.length; i++) {
        array1.push(prefUsers[i].categoria);        
      } 
      for (let i = 0; i < categories.length; i++) {
        array2.push(categories[i]);        
      }    
      
      for (var i = 0; i < array2.length; i++) {
          var igual=false;
           for (var j = 0; j < array1.length & !igual; j++) {
               if(array2[i].categoria === array1[j] )
                igual=true;
              }
          if(!igual)array.push(array2[i]);
      }
      console.log();
      if (array) {
        setCategoriasFalt(array);
      }
      else {
        setCategoriasFalt(null);
      }
      
    }
  },[categories, prefUsers])
  /**
   * Función para redireccionar al reproductor del video seleccionado, se crea un nuevo historial de usuario si es la primera vez en ver el video, de lo contrario se envía este historial como state
   * @param {*} id 
   */
  const verVideo = async (id) =>{
    const formData = new FormData();
    let histUser;
    let contador = 0;
    formData.append("usuario", user.id);
    formData.append("video", id);
    try {
      for (let index = 0; index < histUsers.length; index++) {
      const element = histUsers[index];
        if (element.usuario.id === user.id && element.video === id) {
          histUser= element;
          contador++;
        }
      }
      if(contador ===0) {
        const hu = await  HistorialUserServer.RegisterHistorialUser(formData);
        histUser = hu.data;
      }
    } catch (error) {
      console.log(error);
    }
    history(`/seeVideo/${id}`,{state:histUser});
    
  }
  
  const classes = useStyles();
  if (videos.length >0 ) {
    return (
      <div>
        <div id="carousel_videos">
          <h2>Ultimos videos</h2>
          <Carousel className={classes.root} id="carousel" fade >
            {videos &&
              props.search(videos).slice(0, 4).map((video) => (
                <Carousel.Item key={video.id}>
                  <VideosItem
                    key={video.id}
                    video={video}
                    listVideos={props.listVideos}
                    histUsers = {histUsers}
                    user = {user}
                    verVideo = {verVideo}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <br></br>
        <hr></hr>
        <div id="card_videos">
          {
          prefUsers ? 
            <div>
              {prefUsers && props.search2(prefUsers).map((element, index) => (
                <VideosCategoriaFila2
                  key= {index}
                  categoria ={element}
                  videos={videos}
                  search={props.search}
                  histUsers = {histUsers}
                  user = {user}
                  verVideo= {verVideo}
                >
                </VideosCategoriaFila2>
                ))}
              {categoriasFalt && props.search2(categoriasFalt).map((element, index) => (
                <VideosCategoriaFila2
                  key= {index}
                  categoria ={element}
                  videos={videos}
                  search={props.search}
                  histUsers = {histUsers}
                  user = {user}
                  verVideo= {verVideo}  
                >
                </VideosCategoriaFila2>
                ))}
            </div>
          :
          categories && props.search2(categories).map((element) => (
            <VideosCategoriaFila2
              key= {element.id}
              categoria ={element}
              videos={videos}
              search={props.search}
              histUsers = {histUsers}
              user = {user}
              verVideo= {verVideo}

            >
            </VideosCategoriaFila2>
            ))
          }
        </div>
      </div>
    );
  }
  else {
    return (
      <div id="card_videos">
        <h2 style={{color:"red"}}><center>No hay videos en este modulo!!</center></h2>
      </div>
    )
  }
}

export default VideosListUser2;
