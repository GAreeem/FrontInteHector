import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import LayoutUsuario from "./LayoutUsuario";
import { useNavigate } from "react-router-dom";

const Servicios = () => {
  const [categorias, setCategorias] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/categoria/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.result) {
        setCategorias(data.result);
      } else {
        setCategorias([]);
      }
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <LayoutUsuario>
      <Box p={0}>
        <Typography variant="h5" gutterBottom >
          Categorías disponibles
        </Typography>

        <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
          Asegúrate de ofrecer <strong>información verídica, actualizada y completa</strong> al registrar tus servicios.
          Esta información será visible para los clientes y afecta directamente su decisión.
        </Alert>

        <Grid container spacing={3}>
          {categorias.map((categoria) => (
            <Grid item xs={12} sm={6} md={4} key={categoria.idCategoriaServicio}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {categoria.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {categoria.descripcion}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      navigate(`/crear-servicio/${categoria.idCategoriaServicio}`)
                    }
                  >
                    Crear servicio
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LayoutUsuario>
  );
};

export default Servicios;
