//components
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";

//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

//dependencias
import useUser from '../../hooks/useUser'

const useStyles = styled((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

/**
 * Navbar para el header
 * @returns Navbar para el header, dependiendo si esta logeado se retorna un componente diferente
 */
const Navbar = () => {
  const {isLogged, logout } = useUser()
  const classes = useStyles();

  /**
   * Función para ejecutar logout del hook useUser.
   * @param {*} e 
   */
  const handleClick = e => {
    e.preventDefault()
    logout()
  }

  return (      
      isLogged ?
      <>
      <Button
        href="#"
        variant="outlined"
        sx={{ color: '#ffff' }} 
        className={classes.link}
        component={NavLink}
        to="/Perfil"
      >
        <AccountCircleIcon></AccountCircleIcon>
        Perfil
      </Button>
      <Button
        href="#"
        color="primary"
        variant="outlined"
        className={classes.link}
        component={NavLink}
        to='#' onClick={handleClick}
      >
        Logout
      </Button>
      </>
      :
      <>
      <Button
        href="#"
        color="primary"
        variant="outlined"
        className={classes.link}
        component={NavLink}
        to="/login">
        Login
      </Button>
      </>    
    );
};

export default Navbar;
