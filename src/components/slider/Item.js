import React, { useEffect, useState } from "react";
import cx from "classnames";
import SliderContext from "../context/SliderContext";
import ShowDetailsButton from "./ShowDetailsButton";
//import Mark from './Mark'
import "./Item.scss";
//Components
import Button from "@mui/material/Button";

/**
 * Componente para mostrar el elemento en el slider
 * @param {Object} video 
 * @returns 
 */
const Item = ({ video,...props }) => {
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
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef, history }) => {
        const isActive = currentSlide && currentSlide.id === video.id;
        
        return (
          <div
            ref={elementRef}
            className={cx("item", {
              "item--open": isActive,
            })}
          >
            <h4>{video.title_espanol}</h4>
            <Button onClick={() => props.verVideo(video.id)}>
            <div className="imagen-container">
              <img
                src={"http://165.227.177.75" + video.featured_image}
                alt=""
              />
            </div>
            </Button>
            <ShowDetailsButton onClick={() => onSelectSlide(video)} />
            {isActive}
            {/* {isActive && <Mark />} */}
            <p>Duración: {duracion}</p>
            { video.tipe_of_video === 1 ? 
                (
                  <h4 >Pelicula</h4>
                ) : video.tipe_of_video === 2 ?
                (
                <h4 >Serie</h4>
                ):
                <h4 >Caso</h4>
            }
          </div>
        );
      }}
    </SliderContext.Consumer>
  );
};

export default Item;
