import React, { useEffect, useState } from "react";

//dependencies
import * as VideoServer from "../services/videoServer";
import PeliculasList from "../components/videos/peliculas";
import VideoLoadingComponent from "../components/videos/videoLoading";
//components
import { Container } from "@mui/material";

/**
 * Carga todos los videos que sean 'Peliculas' para el modulo Videos de la aplicación
 */
function AppPeliculas() {
  const VideoLoading = VideoLoadingComponent(PeliculasList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    VideoServer.ListPeliculas().then((res) => {
      const allVideos = res.videos;
      setAppState({ loading: false, videos: allVideos });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} peliculas={appState.videos} />
      </div>
    </Container>
  );
}
export default AppPeliculas;
