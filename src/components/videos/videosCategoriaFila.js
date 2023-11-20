/* eslint-disable array-callback-return */
import React from "react";
//
import Slider from "../slider/index";
import '../../styles/slider.css'
import "../../styles/styles.css";
import "../../styles/conCate.css";

/**
 * Componente que retorna los videos ordenados en un slider dependiendo de su categoria.
 * @param {*} param0 
 * @returns Slider con los videos.
 */
const VideosCategoriaFila = ({ categoria, verVideo,...props }) => {

  if(categoria){
    
    return (
    <div >      
      <div className="">
        <h1 className="titleCateg" key = {categoria.id}>{categoria.categoria}</h1>
        <div >
        <Slider verVideo = {verVideo}>
          {props.videos && props.search(props.videos).map((video) =>(
            video.categorias.map((element) => {
              if (categoria.categoria === element.categoria)
                return( 
                  <Slider.Item
                  key={video.id} 
                  video={video} 
                  histUsers = {props.histUsers}
                  user = {props.user}
                  verVideo = {verVideo}>
                  
                  </Slider.Item>
                )
              })
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );}
  
};

export default VideosCategoriaFila;
