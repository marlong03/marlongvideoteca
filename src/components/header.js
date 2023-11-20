import React, { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import { NavLink } from "react-router-dom";
import Switch from "../Switch"
import {  useContext } from "react";

//dependencies
import Context from "./context/UserContext";
import useUser from '../hooks/useUser'
import Sidebar from "./navbar/sidebarUser";
import { ListCategorias } from "../services/category";
//componentes
import {  Toolbar, Typography, AppBar,Box } from "@mui/material";
import Link from "@mui/material/Link";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

/**
 * Componente Header
 * @returns Componentes de header, si está logeado se envia sidebar
 */
const Header = () => {
  const classes = useStyles();
  const { isLogged } = useUser()

  const [open] = useState(false);
  const [categories, setCategories] = useState("");
  const { user } = useContext(Context)

  /**
   * Función para enviar la consulta de categorias al backend
   */
  const listCategorias = async () => {
    try {
      const res = await ListCategorias();
      setCategories(res);
    } catch (error) {
      console.log("Error");
    }
  };
  
  /**
   * hook para ejecutar la función listCategorias solo si está logeado.
   */
  useEffect(() => {
    if (isLogged) {
      listCategorias();
      
    }
  }, [isLogged]);

  if (isLogged && categories) {
    return <Sidebar user={user} categories={categories} />;
  } else {
    return (
      <React.Fragment>
        <Box>
          <AppBar
            position="relative"
            open={open}
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                <Link
                  component={NavLink}
                  to="/"
                  underline="none"
                  color="textPrimary"
                >
                  Videoteca
                </Link>
              </Typography>
              <Switch></Switch> 
              <Navbar></Navbar>
            </Toolbar>
          </AppBar>
        </Box>
      </React.Fragment>
    );
  }
};

export default Header;
