import React from "react";

/**
 * Verifica si los videos ya fueron cargados.
 * @param {component} Component 
 * @returns
 */
function VideoLoading(Component) {
  /**
    * @param {boolean} isLoading 
    * @param {Object} props
    * @returns  Si ya cargaron los videos se retorna un componente recibido en la función main de lo contrario retorna mensaje indicando que aún se estan cargando.
  */
  return function VideoLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ fontSize: "25px" }}>
        Estamos esperando que cargue la información!...
      </p>
    );
  };
}
export default VideoLoading;
