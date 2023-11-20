import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//dependencies
import NavbarAd from "./navbarAd";
import Navbar from "../navbar/navbar";
import DrawerS from "./drawer";
import Switch from "../../Switch";
//componentes

import {
  Box,
  Divider,
  Toolbar,
  Typography,
  Drawer,
  AppBar,
  IconButton,
} from "@mui/material";
import Link from "@mui/material/Link";

//import MenuIcon from '@material-ui/icons/Menu';
import MenuIcon from '@mui/icons-material/Menu';
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 350;
/**
 * Componente para nabvar y sidebar 
 * @param {*} props 
 * @returns Componente para nabvar y sidebar 
 */
const Sidebar = (props) => {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <DrawerS 
      user = {props.user}
      handleDrawerToggle = {handleDrawerToggle}
    >
    </DrawerS>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <Box >
        <AppBar 
          position="relative"
          color="default"
          component="nav"
          className={classes.appBar}
        >
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              className={classes.toolbarTitle}
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>              
                <NavbarAd></NavbarAd>
                <Switch></Switch> 
            </Box>
                         
            <Navbar></Navbar>
          </Toolbar>
        </AppBar>
        <Box component="nav"> 
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen} 
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            <DrawerHeader>
              <IconButton onClick={handleDrawerToggle}>x</IconButton>
            </DrawerHeader>
            <Divider />
            {drawer}
          </Drawer>
        </Box>        
      </Box>
    </React.Fragment>
  );
};

export default Sidebar;
