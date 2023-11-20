/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";

//dependencies
import VideosListAd from "../admin/videosListAdmin";
import { ErrorBoundary } from "./errorsBoundary";
import { ListCategorias } from "../../services/category";
import SearchComponent from "./search";
import Context from "../context/UserContext";
import VideosListUser from "./videoListUser";


/**
 * Función para mostrar los videos en la pantalla principal 
 * @param {object} videos
 * @returns Componente del buscador y componente lista (Dependendiendo si el usuario es admin o no, se retorna un componente distinto)
 */
const VideosList = ({videos}) => {
  const contenedorCarousel = document.getElementById('carousel');

  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchParam] = useState(["title_espanol"]);
  const [searchParamCate] = useState(["categorias"]);
  const [searchParam2] = useState(["categoria"]);
  const { user } = useContext(Context)

  const [filterParam, setFilterParam] = useState("All");

  /**
   * Función para traer la lista de categorias 
   */
  const listCategorias = async () => {
    try {
      const res = await ListCategorias();
      setCategories(res);
    } catch (error) {
      console.log("Error");
    }
  };
  
  useEffect(() => {
    listCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /**
   * Función para realizar la busqueda mediante el componente search
   * @param {*} videos 
   * @returns Parametros de la busqueda
   */
  const search = (videos) => {
    if (!query) {
      return videos
    }
    else if (query) {
      contenedorCarousel.style.visibility = 'hidden'
      contenedorCarousel.style.height = '10px';
      const queryLowerCase = query.toLowerCase();
      return videos.filter((dato) => {
        const titleMatches = dato.title_espanol
          .toString()
          .toLowerCase()
          .indexOf(queryLowerCase) > -1;
  
        if (!titleMatches) {
          const descriptionMatches = dato.categorias.some((categoria) =>
          categoria.categoria.toLowerCase().includes(queryLowerCase)
        );
          return descriptionMatches
        }
        return titleMatches
      })
    }
     else {      
      return videos.filter((dato)=>
      dato.categorias.categoria.toString()
      .toLowerCase()
      .indexOf(query.toLowerCase()) > -1
      )
    }
    
  };
  
  /**
   * Función para realizar el filtro por categoria
   * @param {*} categories 
   * @returns Resultado del filtro
   */
  const search2 = (categories) => {
    return categories.filter((item) => {
      if (item.categoria === filterParam) {
        contenedorCarousel.style.visibility = 'hidden'
        contenedorCarousel.style.height = '10px';

        return searchParam2.some((parameter) => {
            return (
                item[parameter]
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
            );
        });
      }
      
      else if (filterParam === "All") {
        contenedorCarousel.style.visibility = 'visible'
        contenedorCarousel.style.height = '100%';
        return videos.filter((item) => {
          return searchParam.some((parameter) => {
            return (
              item[parameter]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
                
            );
          });
        });
      }
    });
  };

  if (user) {
    if (user.is_superuser) {
      return (
        <div >          
          <SearchComponent 
            query ={query}
            setQuery = {setQuery}
            filterParam = {filterParam}
            setFilterParam ={setFilterParam}
            categories={categories}
          ></SearchComponent>
          <VideosListAd
            videos={videos}
            categories={categories}
            search={search}
            search2={search2}
          ></VideosListAd>
        </div>
      );
    }
    return (
      <div >
        <SearchComponent 
          query ={query}
          setQuery = {setQuery}
          filterParam = {filterParam}
          setFilterParam ={setFilterParam}
          categories={categories}
        ></SearchComponent>
        <ErrorBoundary>
          <VideosListUser
              videos={videos}
              categories={categories}
              search={search}
              search2={search2}
            />
        </ErrorBoundary>
      </div>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default VideosList;
