import { useState } from 'react';


export const useModal = (initialValue = false) => {
  const [show, setShow] = useState(initialValue);

  const handleShow = () => setShow(true); //función para mostrar el modal de comentario.
  const handleClose = () => setShow(false); //función para cerrar el modal de comentario.

  return [show, handleShow, handleClose];
}


