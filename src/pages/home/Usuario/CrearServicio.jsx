import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import LayoutUsuario from "./LayoutUsuario";

const CrearServicio = () => {
  const { idCategoria } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const res = await fetch(`http://localhost:8080/categoria/${idCategoria}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data && data.result) {
          setCategoria(data.result);
        }
      } catch (err) {
        console.error("Error al obtener categoría:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [idCategoria, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!form.nombre || !form.descripcion || !form.precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const servicio = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      idCategoria: parseInt(idCategoria),
    };

    try {
      const res = await fetch("http://localhost:8080/servicio/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(servicio),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar el servicio");
      }

      alert("Servicio creado con éxito.");
      setForm({ nombre: "", descripcion: "", precio: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LayoutUsuario>
      <Box p={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Crear servicio para: {categoria?.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {categoria?.descripcion}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Nombre del servicio"
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
              multiline
              rows={3}
              value={form.descripcion}
              onChange={handleChange}
            />
            <TextField
              label="Precio"
              name="precio"
              type="number"
              fullWidth
              margin="normal"
              value={form.precio}
              onChange={handleChange}
            />

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
              Registrar servicio
            </Button>
          </>
        )}
      </Box>
    </LayoutUsuario>
  );
};

export default CrearServicio;
