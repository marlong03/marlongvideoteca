import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Carousel from "react-bootstrap/Carousel";

//dependencies
import VideosItemAdmin from "../admin/videosItemAdmin";
import VideosCategoriaFila from "../videos/videosCategoriaFila";
import * as HistorialUserServer from "../../services/historialUser";


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
 * Componente para organizar en el index del admin los videos en su respectiva categoria, con un buscador y filtro
 * @param {*} videos
 * @param {*} categories
 * @returns Contenedor con los videos y categorias 
 */
function VideosListAd({videos, categories, ...props}) {
  const history = useNavigate();

  const [histUsers, setHistUsers] = useState();  
  
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  /**
 * Función para obtener el historial de los usuarios.
 */
  const getHistorialUsers = async () => {
    try {
      const res = await HistorialUserServer.ListHistorial();
      setHistUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistorialUsers();
  }, []);

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

  return (
    <>
      <div id="carousel_videos">
        <h2 >Ultimos videos</h2>
        <Carousel className={classes.root} id="carousel" fade >
          {videos &&
            props.search(videos).map((video) => (
              <Carousel.Item key={video.id} interval={10000}>
                <VideosItemAdmin
                  key={video.id}
                  video={video}
                  histUsers = {histUsers}
                  user = {user}
                  verVideo= {verVideo}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <br></br>
      <hr></hr>
      <div id="card_videos">
        {videos && categories && props.search2(categories).map((element) => (
          <VideosCategoriaFila
            key= {element.id}
            categoria ={element}
            videos={videos}
            search={props.search}
            histUsers = {histUsers}
            user = {user}
            verVideo= {verVideo}

          >
          </VideosCategoriaFila>
        ))}
      </div>
    </>
  );
}

export default VideosListAd;
