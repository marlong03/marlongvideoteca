import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";

//dependencias
import * as VideoServer from "../../services/videoServer";
import * as HistorialUserServer from "../../services/historialUser";
import * as commentaryServer from "../../services/commentary";
import { useModal } from "../../hooks/useModal";

//MaterialUI
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import StarIcon from "@mui/icons-material/Star";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

//components
import "../../styles/styles.css";
import ModalComentario from "./comentarioModal";
import ModalComentarios from "./listComentariosModal";
import IframeVideo from "./iframeVideo";

const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
/**
 * Función para mostrar el detalle de un video y guardar la puntuación.
 * @returns Componente que muestra el detalle de un video junto con el iframe
 */
const VideoDetail = () => {
  const history = useNavigate();
  const [show, handleShow, handleClose] = useModal(false);
  const [show2, handleShow2, handleClose2] = useModal(false);

  const location = useLocation();
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [duracion, setDuracion] = useState([]);
  const [uploadDate, setUploadDate] = useState(null);
  const [histUser, setHistUser] = useState(location.state);
  const [commentaries, setCommentaries] = useState([]);
  const [activeStar, setActiveStar] = useState(-1);
  const totalStars = 5;

  /**
   * Función para almacenar la duración del video en un formato adecuado para mostrarla en pantalla.
   * @param {time} duration 
   * @returns Duración en el formato adecuado.
   */
  const changeDuration = (duration) => {
    let tiempo = duration.split(':');
    let new_duration = "";
    if (tiempo) {

      if (tiempo[0] !=="00") {
        new_duration = duration[0]+"hrs:";
      }
      if (tiempo[1] !=="00") {
        new_duration = " "+new_duration+" "+tiempo[1]+"mins:";
      }
      if (tiempo[2] !=="00") {
        new_duration = " "+new_duration+" "+tiempo[2]+"s";
      }
    }
    return new_duration;
  };

  /**
   * Función para obtener la información del video en reproducción
   */
  useEffect(() => {
    const getVideo = async (videoID) => {
      const res = await VideoServer.getVideo(videoID);
      const video = res;

      setUploadDate(new Date(res.upload_date).toDateString());
      setDuracion(changeDuration(res.duration));
      setVideo({
        ...video,
        duration: duracion,        
      });
      
    };
    getVideo(id);

  }, [duracion, id, setVideo, video.title_espanol, video.url_esp, video.url_vimeo_esp]);
  
   useEffect(() => {      
    if (histUser) {
      setActiveStar(histUser.user_score-1);
    } else {
      history("/login");      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  
  useEffect(() => {
    const getCommentaries = async (videoId) => {
      const res = await commentaryServer.ListCommentaryVideo({'video_id':videoId});
      setCommentaries(res);
    }
    getCommentaries(id);
  }, [id]);
  /**
   * Función para cambiar la calificación del video.
   * @param {int} index 
   */
  const handleClick = async (index) => {
    setActiveStar(index);
    let cumulative_score = video.cumulative_score;
    let number_votes = video.numberOfVotes;

    if (histUser.user_score) {
      cumulative_score = cumulative_score - histUser.user_score + index+1;
      const score_video = cumulative_score/number_votes;
      setHistUser({...histUser, user_score:index+1});
      await VideoServer.partialUpdateVideo(video.id, {'cumulative_score': cumulative_score, 'score': score_video})

    } else {
      number_votes +=1;
      cumulative_score = cumulative_score + index+1;
      const score_video = cumulative_score/number_votes;
      setHistUser({...histUser, user_score:index+1});
      await VideoServer.partialUpdateVideo(video.id, {'cumulative_score': cumulative_score,'numberOfVotes': number_votes,'score': score_video})
    }
    await HistorialUserServer.updateHistorialUser(histUser.id,{'user_score': index+1});

  };
  
  const classes = useStyles();

  if (histUser) {
    return (
    <Container>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {video.title_espanol}
        </Typography>
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-8 col-12 iframe1">
          <IframeVideo
            video={video}
            >
          </IframeVideo>
        </div>
        <div className="col-md-4 col-12 infoVideo" >
          <Typography component="h4" variant="h5" style={{color:"aqua"}} align="center">
            {video.duration}&nbsp;&nbsp;{uploadDate}
          </Typography>
          <br></br>
          <Typography component="h6" variant="body1" align="justify">
            {video.description_esp}
          </Typography>
          <br></br>
          <Typography component="h1" variant="h5">
            Tu Calificación:   &nbsp;&nbsp;
            <Box 
              sx={{
                display: "inline-flex",
                position: "relative",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {[...new Array(totalStars)].map((arr, index) => {
                return (
                  <Box 
                  key={index} 
                  position="relative"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleClick(index)}
                  >
                    <Box 
                      sx={{
                        width: index <= activeStar ? "100%" : "0%",
                        overflow: "hidden",
                        position: "absolute",
                      }}
                    >
                      <StarIcon />
                    </Box>
                    <Box>
                      <StarBorderIcon />
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Typography>
          <br></br>
          <Stack  alignItems="center">
            <Button 
            variant="contained" 
            color="success"
            type="submit"
            onClick={handleShow}>
              Realizar comentario
            </Button>
          </Stack>
          <br/>
          {commentaries ? 
            <Stack  alignItems="center">
              <Button 
                variant="contained" 
                color="primary"
                type="submit"
                onClick={handleShow2}>
                Ver otros comentarios
              </Button>
            </Stack>
          : 
            null
          }
          <br/>
        </div>
      </div>
      <ModalComentario
        handleClose={handleClose}
        show={show}
        histUser={histUser}
        videoID ={id}
      ></ModalComentario>
      <ModalComentarios
        handleClose={handleClose2}
        show={show2}
        histUser={histUser}
        commentaries = {commentaries}
        videoID= {id}
      ></ModalComentarios>
    </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
  
};

export default VideoDetail;
