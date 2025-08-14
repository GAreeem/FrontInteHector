import React from "react";
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  RoomService as RoomServiceIcon,
  EventAvailable as EventAvailableIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const UsuarioDrawer = ({ logout }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Toolbar/>
                <Box sx={{ overflow: "auto", pr: 2, pl: 2 }}>
                      <List>
                        <ListItem button sx={{ cursor: "pointer", borderRadius: '10px'}} onClick={() => navigate("/usuario")}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <DashboardIcon sx={{ color: "var(--beige-dark)" }} />
                          </ListItemIcon>
                          <ListItemText primary="Inicio" />
                        </ListItem>
                        <ListItem button style={{ cursor: "pointer", borderRadius: '10px' }} onClick={() => navigate("/servicios")}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <RoomServiceIcon sx={{ color: "var(--beige-dark)" }} />
                          </ListItemIcon>
                          <ListItemText primary="Agregar servicios" />
                        </ListItem>
                        <ListItem button style={{ cursor: "pointer", borderRadius: '10px' }} onClick={() => navigate("")}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <EventAvailableIcon sx={{ color: "var(--beige-dark)" }} />
                          </ListItemIcon>
                          <ListItemText primary="Crear Reservaciones" />
                        </ListItem>
                        <Divider sx={{ my: 1 }} />
                        <ListItem button style={{ cursor: "pointer", borderRadius: '10px' }} onClick={() => navigate("/perfil")}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <PersonIcon sx={{ color: "var(--beige-dark)" }} />
                          </ListItemIcon>
                          <ListItemText primary="Perfil" />
                        </ListItem>
                        <ListItem
                          button
                          onClick={() => {
                            Swal.fire({
                              title: "¿Quieres cerrar sesión?",
                              text: "Regresarás a la pantalla de inicio.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Sí",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire({
                                  title: "Cerrando sesión",
                                  text: "Has cerrado sesión.",
                                  icon: "success",
                                  timer: 1500,
                                  showConfirmButton: false,
                                }).then(() => {
                                  logout();
                                });
                              }
                            });
                          }}
                          style={{ cursor: "pointer", borderRadius: '10px' }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <LogoutIcon sx={{ color: "var(--beige-dark)" }} />
                          </ListItemIcon>
                          <ListItemText primary="Cerrar Sesión" />
                        </ListItem>
                      </List>
                    </Box>
        </div>
    )
}

export default UsuarioDrawer;