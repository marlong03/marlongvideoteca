import { NavLink } from "react-router-dom";
import Switch from "../../Switch";

//componentes
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

/**
 * Componente con los botones para el sidebar 
 * @param {*} props 
 * @returns Botones para el sidebar dependiendo si es admin o no
 */
const DrawerS = (props) => {

    if (props.user.is_superuser) {
        return (
            <Box onClick={props.handleDrawerToggle} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ my: 2 }}>
                SCCOT
              </Typography>
              <Divider />
              <Box
                display="flex"
                mt={2}
                mr={2}
                justifyContent="space-between"
                fontWeight={500}
              >
                <Typography component={"span"} variant={"body2"}>
                  <Box ml={2} fontWeight="fontWeightLight" fontSize={14}>
                    <Switch></Switch> 
                  </Box>
                  <Box ml={2} fontWeight="fontWeightLight" fontSize={14}>
                    {props.user.name}
                  </Box>
                  <List>
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/">
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Videos">
                        <ListItemText primary="Peliculas" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Series">
                        <ListItemText primary="Series" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Casos">
                        <ListItemText primary="Casos" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Ajustes">
                        <ListItemText primary="Ajustes" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/VideoForm">
                        <ListItemText primary="Agregar video" />
                      </ListItemButton>
                    </ListItem> 
                  </List>
                </Typography>        
              </Box>
            </Box>
            );
    } else {
        return (
            <Box onClick={props.handleDrawerToggle} sx={{ textAlign: 'center' }}>
              <Divider />
              <Box
                display="flex"
                mt={2}
                mr={2}
                justifyContent="space-between"
                fontWeight={500}
              >
                <Typography component={"span"} variant={"body2"}>
                  <Box ml={2} fontWeight="fontWeightLight" fontSize={14}>
                    <Switch></Switch> 
                  </Box>
                  <Box ml={2} fontWeight="fontWeightLight" fontSize={14}>
                    {props.user.name}
                  </Box>
                  <List>
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/">
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Videos">
                        <ListItemText primary="Videos" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Series">
                        <ListItemText primary="Series" />
                      </ListItemButton>
                    </ListItem> 
                    <ListItem  >
                      <ListItemButton sx={{ textAlign: 'center' }} component={NavLink}
                    to="/Casos">
                        <ListItemText primary="Casos" />
                      </ListItemButton>
                    </ListItem> 
                  </List>
                </Typography>        
              </Box>
            </Box>
            );
    }
    
};

export default DrawerS ;