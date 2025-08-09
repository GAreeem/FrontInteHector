import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import LayoutCliente from "./LayoutCliente";

const HacerReservacion = () => {
  const { idServicio } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    idServicio: parseInt(idServicio),
    idUsuario: "",
    reservationDate: "",
  });

  // 🔹 Cargar información del servicio seleccionado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchServicio = async () => {
      try {
        const res = await fetch(`http://localhost:8080/servicio/${idServicio}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data && data.result) {
          setServicio(data.result);
        }
      } catch (err) {
        console.error("Error al obtener servicio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServicio();
  }, [idServicio]);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar reservación
  const handleReservar = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("idUser");

    if (!usuarioId) {
      alert("No se encontró el ID del usuario.");
      return;
    }

    const body = {
      ...form,
      idUsuario: parseInt(usuarioId),
      reservationDate: form.reservationDate
        ? `${form.reservationDate}:00` // le agregamos segundos
        : null,
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
        navigate("/cliente"); // QUE REDIRIJA A SUS RESERVACIONES
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
          Hacer Reservación
        </Typography>

        {loading ? (
          <Typography>Cargando servicio...</Typography>
        ) : servicio ? (
          <>
            {/* Card con la información del servicio */}
            <Card sx={{ display: "flex", mb: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="https://i.pinimg.com/1200x/c6/9c/e0/c69ce0375b8fec49f82677f355c73fb4.jpg"
                alt={servicio.nombre}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                  <Typography variant="h5">{servicio.nombre}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {servicio.descripcion}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Precio: ${servicio.precio.toFixed(2)}
                  </Typography>
                </CardContent>
              </Box>
            </Card>

            {/* Formulario */}
            <Paper elevation={3} sx={{ p: 3, maxWidth: 500 }}>
              <TextField
                label="Asunto"
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
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleReservar}
              >
                Reservar
              </Button>
            </Paper>
          </>
        ) : (
          <Typography>No se encontró el servicio.</Typography>
        )}
      </Box>
    </LayoutCliente>
  );
};

export default HacerReservacion;
