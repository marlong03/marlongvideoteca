import React, { useEffect, useState } from "react";

//dependencies
import VideosList from "../components/videos/videosList";
import VideoLoadingComponent from "../components/videos/videoLoading";
import * as VideoServer from "../services/videoServer";
//components
import { Container } from "@mui/material";
import PropTypes from "prop-types"


/**
 * Carga todos los videos para el Home de la aplicación
 */
const  Principal = () =>{
  const VideoLoading = VideoLoadingComponent(VideosList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  
  useEffect(() => {
    VideoServer.ListVideos().then((res) => {
      const allVideos = res.videos;
      setAppState({ loading: false, videos: allVideos });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} videos={appState.videos} />
      </div>
    </Container>
  );
  
}
Principal.propTypes  = {
  loading: PropTypes.bool,
  videos: PropTypes.object
}
export default Principal;
