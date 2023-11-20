import { useState, useRef, useEffect } from 'react'

/**
 * Calcula el tamaño del slider.
 * @returns 
 */
const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(elementRef);
  
  useEffect(() => {
    if(elementRef.current && elementRef.current.scrollWidth && elementRef.current.clientWidth){
      setWidth(elementRef.current.clientWidth);
    }
    
  }, []);

  
  return { width, elementRef }; 
}

export default useSizeElement;