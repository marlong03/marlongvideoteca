import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListEspecialidades from "../especialidades/listEspecialidades"
import * as especialidadServer from "../../services/especialidad";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";

//components
import { Container } from "@mui/material";

const  Principal = () =>{
    const EspecialidadLoading = VideoLoadingComponent(ListEspecialidades);
    const { user } = useContext(Context);

    const [appState, setAppState] = useState({
      loading: true,
      especialidades: null,
    });   
    
    useEffect(() => {
        especialidadServer.ListEspecialidades().then((res) => {
        const allEspecialidades = res;
        setAppState({ loading: false, especialidades: allEspecialidades });
      });
    }, [setAppState]);
  if (user) {
    return (
      <Container>
        <div className="App">
          <EspecialidadLoading isLoading={appState.loading} especialidades={appState.especialidades} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}

export default Principal;
