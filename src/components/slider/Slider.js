import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from '../context/SliderContext'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'

import { useNavigate } from "react-router-dom";


/**
 * Componente Slider para los videos del home.
 * @param {*} children 
 * @returns Slider
 */
const Slider = ({ children, activeSlide, ...props }) => {
  const history = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  } = useSliding(width, React.Children.count(children));

  /**
   * Función para mostrar los detalles de un video que se seleccione en el slider.
   * @param {Object} video 
   */
  const handleSelect = video => {
    setCurrentSlide(video);
  };

  /**
   * Función para cerrar los detalles de un video que se seleccione en el slider.
   * @param {Object} video 
   */
  const handleClose = () => {
    setCurrentSlide(null);
  };

  /**props enviadas al Context.Provider */
  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
    history,
  };
    return (
        <SliderContext.Provider value={contextValue}>
          <SliderWrapper>
            <div
              className={cx('slider', { 'slider--open': currentSlide != null })}
            >
              <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
            </div>
            {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
            {hasNext && <SlideButton onClick={handleNext} type="next" />}
          </SliderWrapper>
          {currentSlide && <Content video={currentSlide} verVideo={props.verVideo} onClose={handleClose} />}
        </SliderContext.Provider>
      );
   
  
};

export default Slider;