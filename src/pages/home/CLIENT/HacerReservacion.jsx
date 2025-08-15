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
import { motion } from "framer-motion";

const HacerReservacion = () => {
  const { idServicio } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minDateTime, setMinDateTime] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    idServicio: parseInt(idServicio),
    idUsuario: "",
    reservationDate: "",
  });

  // 🔹 Calcular fecha mínima (hoy) para evitar reservas en el pasado
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Ajuste zona horaria
    setMinDateTime(now.toISOString().slice(0, 16)); // YYYY-MM-DDTHH:mm
  }, []);

  // 🔹 Cargar información del servicio
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

  // 🔹 Manejar cambios en el formulario (sin espacios iniciales/finales)
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type !== "datetime-local") {
      value = value.replace(/^\s+|\s+$/g, ""); // Eliminar espacios al inicio y final
    }
    setForm({ ...form, [e.target.name]: value });
  };

  // 🔹 Enviar reservación con validaciones
  const handleReservar = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("idUser");

    if (!usuarioId) {
      alert("No se encontró el ID del usuario.");
      return;
    }

    if (!form.nombre.trim()) {
      alert("El campo 'Asunto' no puede estar vacío.");
      return;
    }

    if (!form.descripcion.trim()) {
      alert("El campo 'Descripción' no puede estar vacío.");
      return;
    }

    if (!form.reservationDate) {
      alert("Debe seleccionar una fecha y hora para la reservación.");
      return;
    }

    if (new Date(form.reservationDate) < new Date()) {
      alert("La fecha y hora deben ser futuras.");
      return;
    }

    const body = {
      ...form,
      idUsuario: parseInt(usuarioId),
      reservationDate: `${form.reservationDate}:00`, // Agregar segundos
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
        navigate("/cliente");
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
                image={servicio.imagenUrl || "/default-image.png"}
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >
            <Paper elevation={3} sx={{ p: 3, maxWidth: 500, backgroundColor: "#c5c2c2ff" }}>
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
                label="Fecha y hora de reservación"
                type="datetime-local"
                name="reservationDate"
                fullWidth
                margin="normal"
                value={form.reservationDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: minDateTime, // ⏳ Fecha mínima
                }}
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
            </motion.div>
          </>
        ) : (
          <Typography>No se encontró el servicio.</Typography>
        )}
      </Box>
      
    </LayoutCliente>
  );
};

export default HacerReservacion;
