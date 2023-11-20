import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListCategories from "../categories/listCategories"
import * as categoryServer from "../../services/category";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";

//components
import { Container } from "@mui/material";

const  Principal = () =>{
    const CategoryLoading = VideoLoadingComponent(ListCategories);
    const { user } = useContext(Context);

    const [appState, setAppState] = useState({
      loading: true,
      categories: null,
    });   
    
    useEffect(() => {
        categoryServer.ListCategorias().then((res) => {
        const allCategories = res;
        setAppState({ loading: false, categories: allCategories });
      });
    }, [setAppState]);
  if (user) {
    return (
      <Container>
        <div className="App">
          <CategoryLoading isLoading={appState.loading} categories={appState.categories} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}

export default Principal;
