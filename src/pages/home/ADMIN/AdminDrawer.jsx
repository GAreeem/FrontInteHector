import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Category as CategoryIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  EventAvailable as EventAvailableIcon,
  Send as SendIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminDrawer = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button style={{ cursor: "pointer" }} onClick={() => window.location.href = "/inicio"}
                >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button style={{ cursor: "pointer" }} onClick={() => navigate('/categorias')}>
            <ListItemIcon>
              <CategoryIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Gestionar Categorias" />
          </ListItem>
          <ListItem button style={{ cursor: "pointer" }} onClick={() => navigate("/bitacora")}>
            <ListItemIcon>
              <EventAvailableIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Bitacora" />
          </ListItem>
          <ListItem button style={{ cursor: "pointer" }}>
            <ListItemIcon>
              <SendIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Enviar Invitaciones" />
          </ListItem>
          <ListItem button style={{ cursor: "pointer" }}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItem>
          <Divider sx={{ my: 1 }} />
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
            style={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "var(--beige-dark)" }} />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default AdminDrawer;