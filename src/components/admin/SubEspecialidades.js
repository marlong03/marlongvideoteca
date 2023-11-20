import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListSubEspecialidades from "../especialidades/listSubEspecialidades"
import * as subREpecialidadServer from "../../services/subEspecialidad";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";

//components
import { Container } from "@mui/material";

const  Principal = () =>{
    const SubEspecialidadLoading = VideoLoadingComponent(ListSubEspecialidades);
    const { user } = useContext(Context);

    const [appState, setAppState] = useState({
      loading: true,
      subEspecialidades: null,
    });   
    
    useEffect(() => {
        subREpecialidadServer.ListSubEspecialidades().then((res) => {
        const allSubEspecialidades = res;
        setAppState({ loading: false, subEspecialidades: allSubEspecialidades });
      });
    }, [setAppState]);
  if (user) {
    return (
      <Container>
        <div className="App">
          <SubEspecialidadLoading isLoading={appState.loading} subEspecialidades={appState.subEspecialidades} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}

export default Principal;
