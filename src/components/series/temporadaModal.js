import React from "react";
//dependencias
import * as TemporadaServer from "../../services/temporada";
import { ErrorBoundary } from "../videos/errorsBoundary";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { makeStyles } from "@material-ui/core/styles";
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
const ModalTemporada = ({ handleClose, show, temporada_id, currentItem, setFormData, newData, listSeries, ...props}) => {


  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    setFormData({...newData, [name]: e.target.value });
  };

  const handleSelectSerie = (e) => {
    let target = e.target;
    let name = target.name;
    //here
    let value = Array.from(target.selectedOptions, (option) => option.value);
    setFormData({ ...newData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!temporada_id) {
        formData.append("temporada", newData.temporada);
        formData.append("temporada_letras", newData.temporada_letras);
        formData.append("temporada_numero", newData.temporada_numero);
        formData.append("description", newData.description);
        formData.append("serie", newData.serie);

        await TemporadaServer.RegisterTemporada(formData);
      } else {
        formData.append("temporada", newData.temporada);
        formData.append("temporada_letras", newData.temporada_letras);
        formData.append("temporada_numero", newData.temporada_numero);
        formData.append("description", newData.description);
        formData.append("serie", newData.serie);
        await TemporadaServer.updateTemporada(temporada_id, formData);        
      }
      const res = await TemporadaServer.ListTemporadas();
      const data = await res;
      props.setTemporadas(data);
    } catch (error) {
      for (const property in error.response.data) {
        alert(`${property}: ${error.response.data[property]}`);
      }      
    }
  }
  
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName = {classes.cloud}
      centered
      >
        <Modal.Header closeButton >
          <Modal.Title id="tituloModal" ><h2>{temporada_id? 'Editar Registro' : 'Crear Registro'}</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body id="bodyModal" >
          <Form onSubmit={handleSubmit}  >
            <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
              <Form.Control type="text" 
              name="temporada"
              placeholder="Nombre de la temporada"
              value={newData.temporada || ""}
              onChange={handleInputChange} 
              />
            </Form.Group><br></br>
            <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
              <Form.Control type="text" 
              name="temporada_letras"
              placeholder="Temporada en letras"
              value={newData.temporada_letras || ""}
              onChange={handleInputChange} 
              />
            </Form.Group><br></br>
            <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
              <Form.Control type="number" 
              name="temporada_numero"
              placeholder="Temporada en número"
              value={newData.temporada_numero || null}
              onChange={handleInputChange} 
              />
            </Form.Group><br></br>
            <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
              <Form.Control as="textarea" rows={3}
              name="description"
              placeholder="Descripción de la temporada"
              value={newData.description || ""}
              onChange={handleInputChange} 
              />
            </Form.Group><br></br>
            <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
              <Form.Select
              name="serie"
              placeholder="Serie a la que pertenece"
              value={newData.serie || 2}
              onChange={handleSelectSerie} 
              >
              {
                listSeries.map((Serie, index) => (
                  <option key={Serie.id} value={Serie.id}>
                    {Serie.serie}
                  </option>
                ))
              }
              </Form.Select>
            </Form.Group><br></br>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
              {temporada_id ? 'Guardar Cambios' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </ErrorBoundary>

    
    
  )
};

export default ModalTemporada;