import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutCliente from "./LayoutCliente";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

const ClienteHome = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8080/categoria/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data && data.result) {
          setCategorias(data.result);
        }
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [navigate]);

  return (
    <LayoutCliente>
      <Box>
        {/* Banner con buscador */}
        <Card sx={{ position: "relative", height: 300, mt: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image="https://th.bing.com/th/id/R.f519d4d85fca2841ffdb14a0d0959e3f?rik=SdJ%2bcVsM%2bLDUXw&pid=ImgRaw&r=0&sres=1&sresct=1"
            alt="Banner"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              px: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Encuentra tu servicio ideal
            </Typography>
            <Box sx={{ display: "flex", width: "100%", maxWidth: 600 }}>
              <TextField
                fullWidth
                placeholder="Buscar servicio, categoría..."
                variant="outlined"
                sx={{
                  bgcolor: "#fff",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                Buscar
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Mostrar categorías en tarjetas */}
        <Box sx={{ mt: 4, px: 3 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {categorias.map((cat) => (
                <Grid item xs={12} sm={6} md={4} key={cat.idCategoriaServicio}>
                  <Box
                    onClick={() => navigate(`/ver-servicio/${cat.idCategoriaServicio}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: 250,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://i.pinimg.com/1200x/c6/9c/e0/c69ce0375b8fec49f82677f355c73fb4.jpg"
                        alt={`Imagen de ${cat.nombre}`}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {cat.nombre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {cat.descripcion}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </LayoutCliente>
  );
};

export default ClienteHome;
