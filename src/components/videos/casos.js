/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";
//dependencies
import { ErrorBoundary } from "./errorsBoundary";
import { ListCategorias } from "../../services/category";
import SearchComponent from "./search";
import VideosListUser2 from "./videoListUser2";

/**
 * Función para mostrar los videos con tipo Casos en la pestaña Casos
 * @param {object} casos
 * @returns Componente del buscador y componente lista (Dependendiendo si el usuario es admin o no, se retorna un componente distinto)
 */
const CasosList = ({casos, ...props}) => {
  const contenedorCarousel = document.getElementById("carousel");

  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState("");
  const [searchParam] = useState(["title_espanol"]);
  const [searchParam2] = useState(["categoria"]);

  const [filterParam, setFilterParam] = useState(["All"]);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

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
  }, []);
  
  /**
   * Función para realizar la busqueda mediante el componente search
   * @param {*} casos 
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
        contenedorCarousel.style.visibility = "hidden";
        contenedorCarousel.style.height = "10px";

        return searchParam2.some((parameter) => {
          return (
            item[parameter]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      }
      // eslint-disable-next-line eqeqeq
      else if (filterParam == "All") {
        contenedorCarousel.style.visibility = "visible";
        contenedorCarousel.style.height = "100%";
        return casos.filter((item) => {
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
            query={query}
            setQuery={setQuery}
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            categories={categories}
          ></SearchComponent>
          <ErrorBoundary>
            <VideosListUser2
              videos={casos}
              categories={categories}
              search={search}
              search2={search2}
            />
          </ErrorBoundary>
        </div>
      );
    }
    return (
      <div >
        <SearchComponent
          query={query}
          setQuery={setQuery}
          filterParam={filterParam}
          setFilterParam={setFilterParam}
          categories={categories}
        ></SearchComponent>
        <ErrorBoundary>
        <VideosListUser2
            videos={casos}
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

export default CasosList;
