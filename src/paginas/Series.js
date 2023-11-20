import React, { useEffect, useState } from "react";

//dependencies
import * as VideoServer from "../services/videoServer";
import SeriesList from "../components/videos/series";
import VideoLoadingComponent from "../components/videos/videoLoading";
//components
import { Container } from "@mui/material";

/**
 * Carga todos los videos que sean 'Series' para el modulo Series de la aplicación
 */
function AppSeries() {
  const VideoLoading = VideoLoadingComponent(SeriesList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    VideoServer.ListSeries().then((res) => {
      const allSeries = res.videos;
      setAppState({ loading: false, series: allSeries });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} series={appState.series} />
      </div>
    </Container>
  );
}
export default AppSeries;
