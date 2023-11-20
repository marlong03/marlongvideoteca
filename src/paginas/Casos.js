import React, { useEffect, useState } from "react";

//dependencies
import CasosList from "../components/videos/casos";
import VideoLoadingComponent from "../components/videos/videoLoading";
import * as VideoServer from "../services/videoServer";

//components
import { Container } from "@mui/material";

/**
 * Carga todos los videos que sean Casos para el modulo Casos de la aplicación
 */
function AppCasos() {
  const VideoLoading = VideoLoadingComponent(CasosList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    VideoServer.ListCasos().then((res) => {
      const allVideos = res.videos;
      setAppState({ loading: false, videos: allVideos });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} casos={appState.videos} />
      </div>
    </Container>
  );
}
export default AppCasos;
