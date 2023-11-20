import React from "react";
//components
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

//MaterialUI
import Button from "@mui/material/Button";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

//dependencias
import * as VideoServer from "../../services/videoServer";
import "../../styles/styles.css";

const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",

  },
  imagenCarousel:{
    maxWidth:"100%",
    maxHeight:"100%", 
    objectFit:"cover",
  },
  "@media (min-width: 1200px)": {
    imagen:{
      minWidth: 820,
    },
    imagenCarousel:{
      width:1240,
      height:400,
    },
  },
}));

/**
 * Componente para mostrar en el carousel del admin los videos con algunos campos.
 * @param {*} video
 * @returns Item de un video.
 */
const VideosItemAdmin = ({ video,...props }) => {
  const history = useNavigate();

  /**
   * Elimina el video seleccionado y recarga la pagina.
   * @param {pk} videoID 
   */
  const handleDelete = async (videoID) => {
    await VideoServer.DeleteVideo(videoID);
    window.location.reload();
  };

  const classes = useStyles();

  return (
    <div  id="contenedorItemVideo">
      <div className={"row "+classes.row}>
        <div className={"col-md-8  col-12 "+classes.imagen}>
          <Button onClick={() => props.verVideo(video.id)}>
            <Image
              src={"http://165.227.177.75" + video.featured_image}
              className={classes.imagenCarousel}
            >
            </Image>
          </Button>
        </div>
        <div className="col-md-4 col-12 ">
          <h3 className={classes.paper}>{video.title_espanol}</h3>
          <p className="card-text">Duración: {video.duration}</p>
          <Box
            sx={{'& > legend': { mt: 2 },}}
          >
            <Rating name="read-only" value={parseFloat(video.score)} precision={0.5} readOnly />
          </Box>
          <br></br>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => history(`/updateVideo/${video.id}`)}
              className="ms-6 btn  btn-info"
            >
              Update
            </button>
            <button
              onClick={() => video.id && handleDelete(video.id)}
              className="btn btn-danger my-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosItemAdmin;
