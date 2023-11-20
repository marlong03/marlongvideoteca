//import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));
/**
 * 
 * @returns Componente con mensaje de alerta al ingresar mal las credenciales de autenticación
 */
function Notification() {
  const classes = useStyles();

  return function ntf({ message, ...props }) {
    if (!message) return <p></p>;
    return (
      <p className={classes.link} style={{ fontSize: "25px", color: "red" }}>
        {message}
      </p>
    );
  };
}

export default Notification;


