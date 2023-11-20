import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import * as PreferenciasUserServer from "../../services/preferenciasUser";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//styles
import "../../styles/modalsProfile.css";

/**
 * Componente modal Preferencias con formulario para actualizar las preferencias(gustos) de un usuario.
 * @param {Object} categorias
 * @param {Function} handleClose
 * @returns Componente modal Preferencias
 */
const ModalPreferencias = ({categorias, handleClose, show, ...props}) => {
  const history = useNavigate();
  const [preferencias, setPreferencias] = useState({
    categoria: null,
  });
  
   /**
   * Verifica cambios en el formulario y agrega los valores a preferencias
   * @param {*} e 
   */
  const handleSelectCategory = (e) => {
    let target = e.target;
    let name = target.name;
    //here
    let value = Array.from(target.selectedOptions, (option) => option.value);
    console.log(value);
    setPreferencias({ ...preferencias, [name]: value });
  };

  /**
   * Evento de submit del formulario para agregar las preferencias de usuario.
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(props.user.id);
    try {
        formData.append("usuario", props.user.id);
        formData.append("categoria", preferencias.categoria);
        const res = await PreferenciasUserServer.RegisterPreferenciaUser(formData);
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
        <Modal.Title id="tituloModal" >Ingrese una preferencia</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Categorias</Form.Label>
          <Form.Select
            name="categoria"
            autoFocus
            onChange={handleSelectCategory}
          >
            <option>Seleccione una Categoria</option>
            {categorias && categorias.map((categ, index) => (
              <option key={index} value={categ.id}>
                {categ.categoria}
              </option>
            ))}
          </Form.Select>
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