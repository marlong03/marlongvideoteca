import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import * as UserServer from "../../services/auth";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//styles
import "../../styles/modalsProfile.css";

/**
 * Componente modal Imagen con formulario para actualizar la imagen de perfil.
 * @param {Function} handleClose
 * @param {state} show
 * @returns Componente modal Imagen
 */
const ModalPreferencias = ({handleClose, show, ...props}) => {
  const history = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  
  /**
   * Verifica cambios en el formulario y agrega los valores a selectedFile
   * @param {*} e 
   */
  const handleInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  /**
   * Evento de submit del formulario para actualizar la imagen de perfil.
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
        formData.append("image", selectedFile);
        const res = await UserServer.updateImage(props.user.id,formData);
        alert(res.message);
        history("/Perfil");
        window.location.reload();
    } catch (error) {
        for (const property in error.response.data) {
          alert(`${property}: ${error.response.data[property]}`);
        }      
      }
  }

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" >Cambiar Imagen de Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Imagen de Perfil</Form.Label>
          <input
            className="form-control"
            id="min_image"
            name="min_image"
            onChange={handleInputChange}
            type="file"
            placeholder="Imagen para Email"                
          />
        </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
      </Form>
      </Modal.Body>
      
    </Modal>
  )
};

export default ModalPreferencias;