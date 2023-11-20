import React, { useEffect, useState } from "react";

import "../../index.css";

/**
 * Componente con el buscador y el filtro por categoria
 * @param {*} props 
 * @returns Componente con el buscador y el filtro por categoria
 */
const SearchComponent = (props) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  if (categories) {
    return (
      <div className="wrapper" >
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="      Buscar ..."
              value={props.query}
              onChange={(e) => props.setQuery(e.target.value)}
            />
          </label>
          <div className="select">
            <select
              onChange={(e) => props.setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Videos By Category"
            >
              <option value="All">Filtre por Categoria ▼</option>
              { categories.map((categ, index) => (
                <option key={index} value={categ.categoria}>
                  {categ.categoria}
                </option>
              ))}
            </select>
            <span className="focus"></span>
          </div>
        </div>        
      </div>
    );
  }
};
export default SearchComponent;