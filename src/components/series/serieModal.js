import React from "react";
//dependencias
import * as serieServer from "../../services/serie";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { styled } from '@mui/material/styles';

import "../../styles/cloud.css";


const useStyles = styled((theme) => ({
  
  containerModal:{
    border: "2px solid #ccc",
    borderRadius: 50,
    boxShadow: "4px 4px 4px 0px #5a28e550",
  },
  containerForm: {
    height:"3rem",
    background: "#BFF",
    border: "2px solid #ccc",
    borderRadius: 50,
    boxShadow: "4px 4px 4px 0px #5a28e550",
  },

  "@media (max-width: 720px)": {
    root: {
      display: "flex",
    },
  },
}));
const ModalSerie = ({ handleClose, show, serie_id, currentItem, setFormData, newData, ...props}) => {

  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    setFormData({...newData, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!serie_id) {
        formData.append("serie", newData.serie);
        formData.append("description", newData.description);
        formData.append("quantity", newData.quantity);

        await serieServer.RegisterSerie(formData);
      } else {
        formData.append("serie", newData.serie);
        formData.append("description", newData.description);
        formData.append("quantity", newData.quantity);

        await serieServer.updateSerie(serie_id, formData);        
      }
      const res = await serieServer.ListSeries();
      const data = await res;
      props.setSeries(data);
    } catch (error) {
      for (const property in error.response.data) {
        alert(`${property}: ${error.response.data[property]}`);
      }      
    }
  }
  
  const classes = useStyles();
  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName = {classes.cloud}
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" ><h2>{serie_id? 'Editar Registro' : 'Crear Registro'}</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" >
        <Form onSubmit={handleSubmit}  >
          <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
            <Form.Control type="text"
            name="serie"
            placeholder="Nombre de la serie"
            value={newData.serie || ""}
            onChange={handleInputChange} 
            />
            <br />
            <Form.Control as="textarea" rows={3}
            name="description"
            placeholder="Descripción de la serie"
            value={newData.description || ""}
            onChange={handleInputChange} 
            />
            <br />
            <Form.Control type="number"
            name="quantity"
            placeholder="Cantidad de videos"
            value={newData.quantity || null}
            onChange={handleInputChange} 
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
            {serie_id ? 'Guardar Cambios' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    
  )
};

export default ModalSerie;