import React from "react";
//dependencias
import * as subEspecialidadServer from "../../services/subEspecialidad";

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
const ModalEspecialidad = ({ handleClose, show, subespecialidad_id,currentItem, setFormData, newData, ...props}) => {

  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    setFormData({...newData, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!subespecialidad_id) {
        formData.append("subEspecialidad", newData.subEspecialidad);
        await subEspecialidadServer.RegisterSubEspecialidad(formData);
      } else {
        formData.append("subEspecialidad", newData.subEspecialidad);
        await subEspecialidadServer.updateSubEspecialidad(subespecialidad_id, formData);        
      }
      const res = await subEspecialidadServer.ListSubEspecialidades();
      const data = await res;
      props.setSubEspecialidades(data);
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
        <Modal.Title id="tituloModal" ><h2>{subespecialidad_id? 'Editar Registro' : 'Crear Registro'}</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" >
        <Form onSubmit={handleSubmit}  >
          <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
            <Form.Control type="text" 
            className={classes.containerForm}
            rows={1} 
            name="subEspecialidad"
            value={newData.subEspecialidad || ""}
            onChange={handleInputChange} 
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
            {subespecialidad_id ? 'Guardar Cambios' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    
  )
};

export default ModalEspecialidad;