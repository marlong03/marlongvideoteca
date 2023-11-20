import React from 'react'
import './SliderWrapper.scss'

/**
 * Componente que envuelve los children del Slider
 * @param {*} children
 * @returns 
 */
const SliderWrapper = ({ children }) => (
  
  <div className="slider-wrapper">
    {children}
  </div>
);

export default SliderWrapper;