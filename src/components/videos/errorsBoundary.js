import React from "react";

/**
 * Clase para controlar error al momento de renderizar componentes de videos en contenedor de categorias en la pagina principal y demás modulos.
 */
export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {error: ""};
    }
    
    /**
     * Metodo que recoge el error y lo guarda en el state.error
     * @param {*} error 
     */
    componentDidCatch(error) {
      this.setState({error: `${error.name}: ${error.message}`});
    }
  
    render() {
      const {error} = this.state;
      if (error) {
        return (
          <div className="alert alert-warning" role="alert">
            <h3>Something went wrong !Please wait!</h3>
            <pre>{error.message}</pre>
            {window.location.reload()}
          </div>
        );
      } else {
        return <>
        {this.props.children}
        </>;
      }
    }
  }