import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import LayoutCliente from "./LayoutCliente";

const HacerReservacion = () => {
  const { idServicio } = useParams();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    idServicio: idServicio,
    idUsuario: "", // puedes obtenerlo del token si lo guardaste en localStorage
    reservationDate: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReservar = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("idUsuario"); // si lo tienes guardado
    if (!usuarioId) {
      alert("No se encontró el ID del usuario.");
      return;
    }

    const body = {
      ...form,
      idUsuario: parseInt(usuarioId),
    };

    try {
      const res = await fetch("http://localhost:8080/reservacion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.type === "SUCCESS") {
        alert("Reservación creada exitosamente");
        // puedes redirigir si gustas
      } else {
        alert(data.text || "Ocurrió un error");
      }
    } catch (error) {
      console.error("Error al crear reservación:", error);
    }
  };

  return (
    <LayoutCliente>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Reservar servicio #{idServicio}
        </Typography>

        <Paper elevation={3} sx={{ p: 3, maxWidth: 500 }}>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            value={form.nombre}
            onChange={handleChange}
          />
          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            margin="normal"
            value={form.descripcion}
            onChange={handleChange}
          />
          <TextField
            label="Fecha de reservación"
            type="datetime-local"
            name="reservationDate"
            fullWidth
            margin="normal"
            value={form.reservationDate}
            onChange={handleChange}
          />
          <Button variant="contained" fullWidth onClick={handleReservar}>
            Reservar
          </Button>
        </Paper>
      </Box>
    </LayoutCliente>
  );
};

export default HacerReservacion;
