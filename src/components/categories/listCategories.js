/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";
import { Container } from "@mui/material";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


//dependencies
import Context from "../context/UserContext";
import * as categoryServer from "../../services/category";
import CategoryModal from "./categoryModal";
import { useModal } from "../../hooks/useModal";



const CategoryList = ({ categories }) => {
  const history = useNavigate();

  const [show, handleShow, handleClose] = useModal(false);
  const [id, setId] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [listCategories, setCategories] = useState(categories);
  const initialFormData = {categoria:""};
  const [newData, setFormData] = useState(initialFormData);
  const { user } = useContext(Context);

  const useStyles = styled((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title1: {
      textAlign: "center",
      color: "white"
    }
  }));

  
  const editar = async (item) => {
    setId(item.id);
    setCurrentItem(item);
    setFormData({ categoria: item.categoria });
    handleShow(true)
  };

  const registrar = async () => {
    setId(null);
    setCurrentItem({});
    setFormData({categoria:""});
    handleShow(true)
  };
  


  const getCategorias = async () => {
    try {
      const res = await categoryServer.ListCategorias();
      const data = await res;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getCategorias();
      setId(null)
    } else {
    history("/login");
      
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  
  if (user) {
    
    return (
      <Container> 
        
        <div className={classes.paper}>
              <Typography component="h1" variant="h3">
              CATEGORIAS
              </Typography>
        </div>
        <Stack  alignItems="center">
          <Button 
          variant="contained" 
          color="success"
          type="submit"
          onClick={()=>registrar()}>
            Registrar Categoria
          </Button>
        </Stack>
        <br/><br/> <br/>     
        <div>
          <section className="content">
          <div className="table-responsive table-condensed table-sm tabla">
            <table
              className="table table-hover"
              id="dataTableData"
              name="dataTableData"
              style={{ fontSize: 11, textAlign: "center" }}
            >
              <thead className={classes.title1}>
                <tr>
                  <th style={{ display: "none" }}>Id</th>
                  <th>Codigo</th>
                  <th>Categoria</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {listCategories.length === 0 ? (
                  <tr>
                    <td colSpan={11}>No hay datos</td>
                  </tr>
                ) : (
                  listCategories.map((Categoria, index) => (
                    <tr key={index}>
                      <td style={{ display: "none" }}>{Categoria.id}</td>
                      <td>{Categoria.id}</td>
                      <td>{Categoria.categoria}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm float-right"
                          type="submit"
                          onClick={()=>editar(Categoria)}
                        >
                          editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        </div>
        <CategoryModal
          handleClose={handleClose}
          show={show}
          category_id ={id}
          currentItem={currentItem}
          setCategories = {setCategories}
          setFormData = {setFormData}
          newData={newData}
        ></CategoryModal>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default CategoryList;
