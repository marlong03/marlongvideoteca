import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListSeries from "../series/listSeries"
import * as SerieServer from "../../services/serie";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";
//components
import { Container } from "@mui/material";

/**
 * Carga todos los videos que sean 'Series' para el modulo Series de la aplicación
 */
function AppSeries() {
  const SerieLoading = VideoLoadingComponent(ListSeries);
  const { user } = useContext(Context);

  const [appState, setAppState] = useState({
    loading: true,
    series: null,
  });

  useEffect(() => {
    SerieServer.ListSeries().then((res) => {
      const allSeries = res;
      setAppState({ loading: false, series: allSeries });
    });
  }, [setAppState]);

  if (user) {
    return (
      <Container>
        <div className="App">
          <SerieLoading isLoading={appState.loading} series={appState.series} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}
export default AppSeries;
