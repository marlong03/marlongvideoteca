import React from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//components:
//Usuario
import SignIn from "./components/users/login";
import SignUp from "./components/users/logout";
import Profile from "./components/users/profile";
//Videos
import Header from "./components/header";
import Principal from "./paginas/Principal";
import Peliculas from "./paginas/Peliculas";
import Series from "./paginas/Series";
import Casos from "./paginas/Casos";
import Categorias from "./components/admin/Categorias";
import Especialidades from "./components/admin/Especialidades";
import SubEspecialidades from "./components/admin/SubEspecialidades";
import SeriesAdmin from "./components/admin/SeriesAdmin";
import TemporadasAdmin from "./components/admin/TemporadasAdmin";

import Ajustes from "./paginas/Ajustes";

import VideoDetail from "./components/videos/videoDetail";
import VideoForm from "./components/videos/videoForm";

import { UserContextProvider } from "./components/context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


function App() {
  
  return (
    <UserContextProvider>
      <BrowserRouter>  
      <StyledEngineProvider injectFirst>
        <Header />
      </StyledEngineProvider>
      <div className=" mt-4">
        <Routes>
          <Route exact path="/" element={<Principal />} />
          <Route exact path="/Videos" element={<Peliculas />} />
          <Route exact path="/Series" element={<Series />} />
          <Route exact path="/Casos" element={<Casos />} />
          <Route path="/VideoForm" element={<VideoForm />} />
          <Route path="/updateVideo/:id" element={<VideoForm />} />
          <Route path="/seeVideo/:id" element={<VideoDetail />} />
          <Route path="/Perfil" element={<Profile />} />
          <Route path="/Ajustes" element={<Ajustes />} />
          <Route path="/Ajustes/Categorias" element={<Categorias />} />
          <Route path="/Ajustes/Especialidades" element={<Especialidades />} />
          <Route path="/Ajustes/SubEspecialidades" element={<SubEspecialidades />} />
          <Route path="/Ajustes/Series" element={<SeriesAdmin />} />
          <Route path="/Ajustes/Temporadas" element={<TemporadasAdmin />} />

          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<SignUp />} />
        </Routes>
        <br></br>
      </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}
export default App;
