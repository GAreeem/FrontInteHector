import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutCliente from "./LayoutCliente";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Rating,
} from "@mui/material";

const VerServicio = () => {
  const { idCategoria } = useParams();
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchServiciosPorCategoria = async () => {
      try {
        const res = await fetch(`http://localhost:8080/servicio/categoria/${idCategoria}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data && data.result) {
          setServicios(data.result);
        } else {
          setServicios([]);
        }
      } catch (err) {
        console.error("Error al obtener servicios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiciosPorCategoria();
  }, [idCategoria, token]);

  return (
    <LayoutCliente>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Servicios disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Visualiza todos los servicios registrados para esta categoría.
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : servicios.length === 0 ? (
          <Typography>No hay servicios disponibles para esta categoría.</Typography>
        ) : (
          servicios.map((servicio) => (
            <Card key={servicio.idServicio} sx={{ display: "flex", mb: 4 }} onClick={() => navigate(`/reservar/${servicio.idServicio}`)}>
              <CardMedia
                component="img"
                sx={{ width: 300 }}
                image={servicio.imagenUrl} // imagen estática por ahora
                alt="Imagen servicio"
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {servicio.nombre}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {servicio.descripcion}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        Precio: ${servicio.precio.toFixed(2)}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Puntuación del servicio:
                        </Typography>
                        <Rating value={4} readOnly />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </LayoutCliente>
  );
};

export default VerServicio;
