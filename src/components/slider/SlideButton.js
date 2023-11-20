import React from 'react';
import IconArrowDown from '../Icon/IconArrowDown'
import './SlideButton.scss'

/**
 * Componente con el boton para mover los elementos del slider
 * @param {Function} onClick 
 * @returns 
 */
const SlideButton = ({ onClick, type }) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;