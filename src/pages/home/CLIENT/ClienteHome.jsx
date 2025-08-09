import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutCliente from "./LayoutCliente";
import {
  Card,
  CardMedia,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ClienteHome = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
  if (busqueda.trim() === "") {
    setSugerencias([]);
    return;
  }

  const filtro = busqueda.toLowerCase();

  const resultadosCategorias = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(filtro)
  ).map(cat => ({ tipo: 'categoria', id: cat.idCategoriaServicio, nombre: cat.nombre }));

  const resultadosServicios = servicios.filter(srv =>
    srv.nombre.toLowerCase().includes(filtro)
  ).map(srv => ({ tipo: 'servicio', id: srv.idServicio, nombre: srv.nombre }));

  const resultados = [...resultadosCategorias, ...resultadosServicios].slice(0, 5);

  setSugerencias(resultados);

}, [busqueda, categorias, servicios]);


  const scroll = (id, direction) => {
    const container = document.getElementById(id);
    const scrollAmount = 300;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/categoria/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategorias(data.result || []);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  const fetchServicios = async () => {
    try {
      const res = await fetch("http://localhost:8080/servicio/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setServicios(res.ok && data.result ? data.result : []);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      setServicios([]);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchServicios();
  }, []);

  const arrowButtonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "white",
    color: "#1668e3",
    borderRadius: "50%",
    width: '2rem',
    height: '2rem',
    transition: "all 0.3s",
    "&:hover": {
      bgcolor: "#e0ecff",
    },
  };

  return (
    <LayoutCliente>
      <Box>
        {/* Banner con buscador */}
        <Card sx={{ position: "relative", height: 350, mt: 4, borderRadius: 4, overflow: "visible", }}>
          <CardMedia
            component="img"
            height="350"
            image="https://www.bbva.com/wp-content/uploads/2017/12/billetes-avion-viajes-tarifas-comparacion-precios-ahorro-compra-vuelos-bbva-1024x683.jpg"
            alt="Banner"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              textAlign: "center",
              overflow: "visible",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: "#333" }}>
              ¿A dónde quieres reservar?
            </Typography>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 700 }}>
                <Paper
              sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: 3,
                  position: "relative",
              }}
            >
              <TextField
                fullWidth
                placeholder="Buscar servicio, categoría..."
                variant="outlined"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 0,
                  "& fieldset": { border: 'none' },
                  px: 2,
                }}
                InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
              />
            </Paper>
            {sugerencias.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "90%",
                    mt: 1,
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 4,
                    zIndex: 9999,
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                  }}
                >
                  {sugerencias.map((item, index) => (
                    <Box
                      key={index}
                      onClick={() => navigate(item.tipo === 'categoria' ? `/ver-servicio/${item.id}` : `/reservar/${item.id}`)}
                      sx={{
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                        },
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {item.nombre}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'gray' }}>
                        ({item.tipo})
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>
          </Box>
        </Card>

        {/* CATEGORÍAS */}
        <Box sx={{ mt: 6, px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Explora nuestras categorías
          </Typography>

          <Box sx={{ position: "relative", "&:hover .nav-arrow": { opacity: 1 } }}>
            <IconButton
              onClick={() => scroll("scrollCategorias", "left")}
              className="nav-arrow"
              sx={{ position: "absolute",top: "40%", left: -20, zIndex: 2, opacity: 0, ...arrowButtonStyles }}
            >
              <ArrowBackIosNewIcon sx={{width: '1.1rem', height: '1.1rem'}} />
            </IconButton>

            <Box
              id="scrollCategorias"
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollBehavior: "smooth",
                pb: 1,
                px: "5px",
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              {categorias.map((cat) => (
                <Paper
                  key={cat.idCategoriaServicio}
                  elevation={3}
                  onClick={() => navigate(`/ver-servicio/${cat.idCategoriaServicio}`)}
                  sx={{
                    minWidth: 250,
                    maxWidth: 250,
                    height: 125,
                    p: 2,
                    borderRadius: 4,
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: '#fbece9',
                    borderColor: '#000',
                    justifyContent: "center",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="Body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {cat.nombre}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {cat.descripcion}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <IconButton
              onClick={() => scroll("scrollCategorias", "right")}
              className="nav-arrow"
              sx={{ position: "absolute", top: "40%", right: -20, zIndex: 2, opacity: 0, ...arrowButtonStyles }}
            >
              <ArrowForwardIosIcon sx={{width: '1.1rem', height: '1.1rem'}}  />
            </IconButton>
          </Box>
        </Box>

        {/* SERVICIOS */}
        <Box sx={{ mt: 6, px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Servicios destacados
          </Typography>

          <Box sx={{ position: "relative", "&:hover .nav-arrow": { opacity: 1 } }}>
            <IconButton
              onClick={() => scroll("scrollServicios", "left")}
              className="nav-arrow"
              sx={{ position: "absolute", top: "40%", left: -20, zIndex: 2, opacity: 0, ...arrowButtonStyles }}
            >
              <ArrowBackIosNewIcon sx={{width: '1.1rem', height: '1.1rem'}} />
            </IconButton>

            <Box
              id="scrollServicios"
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollBehavior: "smooth",
                pb: 1,
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              {servicios.map((srv) => (
                <Card
                  key={srv.idCategoriaServicio}
                  sx={{
                    minWidth: 250,
                    maxWidth: 250,
                    height: 300,
                    borderRadius: 4,
                    cursor: "pointer",
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => navigate(`/reservar/${srv.idServicio}`)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={srv.imagenUrl || "https://via.placeholder.com/300x200?text=Servicio"}
                    alt={srv.nombre}
                    sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.1)",
                  }} />
                  <Typography variant="subtitle1" sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    color: "white",
                    fontWeight: 'bold',
                    zIndex: 1,
                  }}>
                    {srv.nombre}
                  </Typography>
                </Card>
              ))}
            </Box>

            <IconButton
              onClick={() => scroll("scrollServicios", "right")}
              className="nav-arrow"
              sx={{ position: "absolute", top: "40%", right: -20, zIndex: 2, opacity: 0, ...arrowButtonStyles }}
            >
              <ArrowForwardIosIcon sx={{width: '1.1rem', height: '1.1rem'}}  />
            </IconButton>
          </Box>
        </Box>
        {/* BANNER PROMOCIONAL FINAL */}
<Box sx={{ mt: 5, display: "flex", justifyContent: "center", p: 1 }}>
  <Card
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 1200,
      borderRadius: 5,
      overflow: "hidden",
    }}
  >
    <CardMedia
      component="img"
      image="https://foodservicemagazine.es/wp-content/uploads/2018/05/reservas-en-los-restaurantes.jpg" // <-- asegúrate de que la ruta esté correcta en producción
      alt="Servicios y Reservas"
      sx={{ height: { xs: 300, md: 400 }, objectFit: "cover" }}
    />
    <Box
      sx={{
        position: "absolute",
        top: { xs: "10%", md: "20%" },
        left: { xs: "5%", md: "8%" },
        bgcolor: "rgba(255,255,255,0.85)",
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        maxWidth: { xs: "80%", md: "35%" },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: "#1e1e1e" }}>
        Servicios y Reservas a tu alcance
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#333" }}>
        Descubre una amplia variedad de servicios y realiza tus reservas de manera rápida, fácil y segura.
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#000d44",
          color: "#fff",
          borderRadius: 5,
          px: 4,
          py: 1,
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#122868" },
        }}
      >
        Explorar
      </Button>
    </Box>
  </Card>
</Box>
      </Box>
    </LayoutCliente>
  );
};

export default ClienteHome;