import React, { useState, useEffect } from "react";
//dependencias
import * as commentaryServer from "../../services/commentary";

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
  cloud: {
    width: "25rem",
    background: "#BFF",
    borderRadius: 50,
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
const ModalComentario = ({histUser, handleClose, show, commentary_id, ...props}) => {
  const initialFormData = {commentary:"", historial_user:histUser, video:props.videoID};
  const [commentary, setCommentary] = useState(initialFormData);

  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    setCommentary({...commentary, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!commentary_id) {
        formData.append("commentary", commentary.commentary);
        formData.append("historial_user", commentary.historial_user.id);
        formData.append("video", commentary.video);
        await commentaryServer.RegisterCommentary(formData);
      } else {
        formData.append("commentary", commentary.commentary);
        await commentaryServer.updateCommentary(commentary_id, formData);        
      }
      
    } catch (error) {
      for (const property in error.response.data) {
        alert(`${property}: ${error.response.data[property]}`);
      }      
    }
  }

  

  useEffect(() => {
    const getCommentary = async (commentary_id) => {
      try {
        const res = await commentaryServer.getCommentary(commentary_id)
        setCommentary({...commentary, commentary: res.commentary})
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (commentary_id) {
      getCommentary(commentary_id)      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentary_id])
  
  const classes = useStyles();
  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName = {"cloud "+ classes.cloud}
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" >Ingrese su Comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" >
        <Form onSubmit={handleSubmit}  >
          <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
            <Form.Control as="textarea" 
            className={classes.containerForm}
            rows={1} 
            name="commentary"
            value={commentary.commentary || ""}
            onChange={handleInputChange} 
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

export default ModalComentario;