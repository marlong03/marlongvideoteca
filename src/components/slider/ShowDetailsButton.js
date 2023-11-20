import React from 'react';
import IconArrowDown from '../Icon/IconArrowDown'
import './ShowDetailsButton.scss'

/**
 * Componente con el boton para mostrar los detalles del elemento
 * @param {Function} onClick 
 * @returns 
 */
const ShowDetailsButton = ({ onClick }) => (
  <button onClick={onClick} className="show-details-button">
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default ShowDetailsButton;