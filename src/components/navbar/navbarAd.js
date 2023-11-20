//components
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import {  useContext } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

//dependencias
import useUser from '../../hooks/useUser'
import Context from "../context/UserContext";
import NotificationsDropdown from './../notifications/notifications_navbar';

const useStyles = styled((theme) => ({
  link: {
    margin: theme.spacing(3, 1),
    color: "black",
  },
}));
/**
 * Componente con botones para el nabvar
 * @returns Botones para el nabvar dependiendo si es admin o no
 */

const NavbarAd = () => {
  
  const { isLogged } = useUser()
  const { user } = useContext(Context)
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  //const [notifications, setNotifications] = useState([]);

  const handleNotificationIconClick = () => {
    setIsOpen(!isOpen);
  };
  const dummyNotifications = [
    { id: 1, text: 'Notificación 1' },
    { id: 2, text: 'Notificación 2' },
    { id: 3, text: 'Notificación 3' },
  ];
  return (
    <>
      {isLogged && user.is_superuser  &&
      <>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Videos"
        >
          Videos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Series"
        >
          Series
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Casos"
        >
          Casos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Ajustes"
        >
          Ajustes
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/VideoForm"
        >
          Agregar video
        </Button>
      </>
      }
      {isLogged && !user.is_superuser  &&
        <>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Videos"
        >
          Videos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Series"
        >
          Series
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Casos"
        >
          Casos
        </Button>
        <Button>
          <NotificationsIcon onClick={handleNotificationIconClick} />
          <NotificationsDropdown isOpen={isOpen} notifications={dummyNotifications} />
        </Button>
        </>
      } 
    </>
  )
}  

export default NavbarAd;
