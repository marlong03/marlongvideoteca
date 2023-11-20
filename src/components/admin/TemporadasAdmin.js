import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import listTemporadas from "../series/listTemporadas"
import * as TemporadaServer from "../../services/temporada";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";
//components
import { Container } from "@mui/material";

/**
 * Carga todos los videos que sean 'Series' para el modulo Series de la aplicación
 */
function AppTemporadas() {
  const TemporadaLoading = VideoLoadingComponent(listTemporadas);
  const { user } = useContext(Context);

  const [appState, setAppState] = useState({
    loading: true,
    temporadas: null,
  });

  useEffect(() => {
    TemporadaServer.ListTemporadas().then((res) => {
      const allTemporadas = res;
      setAppState({ loading: false, temporadas: allTemporadas });
    });
  }, [setAppState]);

  if (user) {
    return (
      <Container>
        <div className="App">
          <TemporadaLoading isLoading={appState.loading} temporadas={appState.temporadas} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}
export default AppTemporadas;
