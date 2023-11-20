import React, { useState, useEffect } from "react";
//dependencies
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser"
//MaterialUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Notification from "../Notification";

const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.contrastText
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),    
  },
  texto: {
    
    backgroundColor: theme.palette.common.white,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Función para mostrar componente de login y hacer la validación de login con el backend.
 * @param {boolean} param0 
 * @returns redirecciona al index si es correcto el login, de lo contrario muestra mensaje de error.
 */
export default function SignIn({onLogin}) {
  const history = useNavigate();
  const {isLoginLoading, hasLoginError, login, isLogged} = useUser()
  const [errorMessage, setErrorMessage] = useState("");
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const Notificacion = Notification();
  const [formData, updateFormData] = useState(initialFormData);

  /**
   * Verifica cambios en el formulario y agrega los valores al formData
   * @param {*} e 
   */
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  /**
   * Valida si el login es correcto para redireccionar al index
   */
  useEffect(() => {
    if (isLogged) {
      history('/')
      onLogin && onLogin();
      window.location.reload();
    }
  }, [history, isLogged,onLogin]);

  /**
   * Valida si el login es incorrecto para enviar mensaje de error
   */
  useEffect(() => {
    if (hasLoginError) {
      setErrorMessage("Credenciales erroneas");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }, [hasLoginError])
  
  /**
   * Envia los datos del formulario a la función login que está en el hook useUser para consultar con el backend.
   * @param {*} e 
   */
  const handleLogin = (e) => {
    e.preventDefault();    
    login({
      username: formData.email,
      password: formData.password,
    })    
  };

  const classes = useStyles();

  return (
    <>{isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className={classes.texto} 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
            className={classes.texto}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>        
        </div>
      </Container>
       }
       { hasLoginError &&  <Notificacion message={errorMessage} />
       }
      
    </>
  );
}
