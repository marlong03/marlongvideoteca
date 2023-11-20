import React from 'react';
import IconCross from '../Icon/IconCross';
import './Content.scss';
//import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import '../../styles/content.css'

//MaterialUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
/**
 * Componente con los detalles del elemento.
 * @param {Object} video 
 * @param {Function} onClose 
 * @returns detalles del video.
 */
const Content = ({ video, onClose, ...props }) => {
  return (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'backgroundImage': `url(http://165.227.177.75${video.featured_image})` }}
      />
    </div>
    <div className="content__area"> 
      <div className="content__area__container">
        <div className="content__title">{video.title_espanol}
        <Box
            sx={{'& > legend': { mt: 2 }}}
          >
            <Rating name="read-only" value={parseFloat(video.score)} precision={0.5} readOnly />
          </Box>
        </div>
        <div className="content__description">
          {video.description_esp}
        </div>
        <div className='content__button'>
          <button className='content__button__glightbox_video' onClick={() => props.verVideo(video.id)}><svg width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="inner-circle" d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z" fill="white"></path>
                    <circle className="outer_circle" cx="65.5" cy="65.5" r="64" stroke="white"></circle>
                    <path className="play" fillRule="evenodd" clipRule="evenodd" d="M60 76V57L77 66.7774L60 76Z" fill="#BF2428"></path>
                </svg></button>
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
)};

export default Content;