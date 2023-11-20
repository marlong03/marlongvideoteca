import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import Context from "../components/context/UserContext";
import { getUser } from "../services/auth";

//components

//MaterialUI
import Container from "@mui/material/Container";
//import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
//styles

/**
 * Componente para el perfil de usuario
 * @returns Componentes necesario para la vista del perfil
 */
const AppAjustes = () => {
  const history = useNavigate();

  const { user } = useContext(Context);
  const [setDataUser] = useState(null);

  const useStyles = styled((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    contenedorImg: {
      flexWrap: "wrap",
    },
    botonList: {
      margin: theme.spacing(3, 1),
      color: "black",
    },
    title1: {
      textAlign: "center",
    }
  }));

  /**
   * Función para consultar la información del usuario
   * @param {id} userId
   */
  const GetUser = async (userId) => {
    const res = await getUser(userId);
    setDataUser(res);
  };


  /**
   * Hook para ejectutar las funciones GetUser, getPreferenciasUser y getCategorias
   */
  useEffect(() => {
    if (user) {
      GetUser(user.id);
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
            AJUSTES
            </Typography>
        </div>
        <div className="d-grid col-4 mx-auto mb-4">
            <button
                className="btn btn-success btn-lg"
                onClick={() => history(`/Ajustes/Categorias`)}
            >
                Categorias
            </button>
        </div>
        <div className="row mb-4 ">
            <div className="d-grid col-4">
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => history(`/Ajustes/Especialidades`)}
                >
                    Especialidades
                </button>
            </div>
            <div className="d-grid  col-4 ">
            </div>
            <div className="d-grid  col-4 ">
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => history(`/Ajustes/SubEspecialidades`)}
                >
                    SubEspecialidades
                </button>
            </div>
        </div>
        <div className="row mb-5 ">
            <div className="d-grid col-4 ">
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => history(`/Ajustes/Series`)}
                >
                    Series
                </button>
            </div>
            <div className="d-grid  col-4 ">
            </div>
            <div className="d-grid  col-4 ">
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => history(`/Ajustes/Temporadas`)}
                >
                    Temporadas
                </button>
            </div>
        </div>
    </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default AppAjustes;
