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
import * as TemporadaServer from "../../services/temporada";
import TemporadaModal from "./temporadaModal";
import * as serieServer from "../../services/serie";

import { useModal } from "../../hooks/useModal";



const SubEspecialidadList = ({temporadas}) => {
  const history = useNavigate();
  const [listSeries, setSeries] = useState(null);

  const [show, handleShow, handleClose] = useModal(false);
  const [id, setId] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [listTemporadas, setTemporadas] = useState(temporadas);
  const initialFormData = {temporada:"",temporada_letras:"", temporada_numero:0, description:"", serie:1};
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
    setFormData({ temporada:item.temporada,temporada_letras: item.temporada_letras, temporada_numero: item.temporada_numero, description: item.description, serie: item.serie });
    handleShow(true)
  };

  const registrar = async () => {
    setId(null);
    setCurrentItem({});
    setFormData({temporada:"",temporada_letras:"", temporada_numero:0, description:"", serie:1});
    handleShow(true)
  };


  const getTemporadas = async () => {
    try {
      const res = await TemporadaServer.ListTemporadas();
      const data = await res;
      setTemporadas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeries = async () => {
  try {
      const res = await serieServer.ListSeries();
      const data = await res;      
      setSeries(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) {
      getSeries();
      getTemporadas();
      setId(null)
    } else {
    history("/login");
      
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  if (user && listSeries) {
    
    return (
      <Container> 
        
        <div className={classes.paper}>
              <Typography component="h1" variant="h3">
              Temporadas
              </Typography>
        </div>
        <Stack  alignItems="center">
          <Button 
          variant="contained" 
          color="success"
          type="submit"
          onClick={()=>registrar()}>
            Registrar Temporada
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
                  <th>Temporada</th>
                  <th>Temporada en tetras</th>
                  <th>Temporada en número</th>
                  <th>Descripción</th>
                  <th>Fecha de registro</th>
                  <th>Serie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {listTemporadas.length === 0 ? (
                  <tr>
                    <td colSpan={11}>No hay datos</td>
                  </tr>
                ) : (
                  listTemporadas.map((Temporada, index) => (
                    <tr key={index}>
                      <td style={{ display: "none" }}>{Temporada.id}</td>
                      <td>{Temporada.id}</td>
                      <td>{Temporada.temporada}</td>
                      <td>{Temporada.temporada_letras}</td>
                      <td>{Temporada.temporada_numero}</td>
                      <td>{Temporada.description}</td>
                      <td>{Temporada.create_date}</td>
                      <td>{Temporada.serie}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm float-right"
                          type="submit"
                          onClick={()=>editar(Temporada)}
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
        <TemporadaModal
          handleClose={handleClose}
          show={show}
          temporada_id ={id}
          currentItem={currentItem}
          setTemporadas = {setTemporadas}
          setFormData = {setFormData}
          newData={newData}
          listSeries={listSeries}
        ></TemporadaModal>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default SubEspecialidadList;
