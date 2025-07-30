import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClientDrawer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
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
        localStorage.removeItem("token");
        Swal.fire({
          title: "Cerrando sesión",
          text: "Has cerrado sesión.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1F2937" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Resvy
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/cliente")}>Inicio</Button>
          <Button color="inherit" onClick={() => navigate("")}>Servicios</Button>
          <Button color="inherit" onClick={() => navigate("")}>Mis Reservaciones</Button>
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientDrawer;
