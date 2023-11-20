import React, { useEffect, useState } from "react";
//components
import { Image } from "react-bootstrap";
import Button from "@mui/material/Button";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';



const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

/**
 * Componente para agregar un elemento a un row
 * @param {*} video
 * @returns Elemento con la información del video
 */
const VideosItemRow = ({ video,...props }) => {
  const classes = useStyles();  
  const [duracion, setDuracion] = useState([]);
  
  const changeDuration = (duration) => {
    let tiempo = duration.split(':');
    let new_duration = "";
    if (tiempo) {

      if (tiempo[0] !=="00") {
        new_duration = duration[0]+"hrs:";
      }
      if (tiempo[1] !=="00") {
        new_duration = " "+new_duration+" "+tiempo[1]+"mins";
      }
    }
    return new_duration;
  };
  useEffect(() => {
    setDuracion(changeDuration(video.duration));

  }, [duracion, video.duration]);
  
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <h3 className={classes.paper}>{video.title_espanol}</h3>
      <div className="card card-body">
        <Button onClick={() =>props.verVideo(video.id)}>
          <Image
            src={"http://165.227.177.75" + video.featured_image}
            className="img-fluid"
          ></Image>
        </Button>
      </div>
      <p>Duración: {duracion}</p>
    </div>
  );
};

export default VideosItemRow;
