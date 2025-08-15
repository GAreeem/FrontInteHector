import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  Stack,
  TextField,
  CardMedia,
  Menu,
  MenuItem,
  Dialog,
  Fab,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery,
  Paper, styled
} from "@mui/material";
import { Add as AddIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import LayoutAdmin from "./LayoutAdmin";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Servicios = () => {
  const [search, setSearch] = useState("");
  const [servicios, setServicios] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: { color: theme.palette.common.black },
    [`& .${tooltipClasses.tooltip}`]: { backgroundColor: theme.palette.common.black },
  }));

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
      if (res.ok && data.result) {
        setServicios(data.result);
      } else {
        setServicios([]);
      }
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      setServicios([]);
    }
  };

 const handleMenuClick = (event, servicio) => {
    setAnchorEl(event.currentTarget);
    setSelectedServicio(servicio);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/editar-servicio/${selectedServicio.idServicio}`);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/servicio/desactivar/${selectedServicio.idServicio}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchServicios();
      } else {
        alert("Error al eliminar el servicio");
      }
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleRestore = async () => {
  try {
    const res = await fetch(`http://localhost:8080/servicio/activar/${selectedServicio.idServicio}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchServicios();
    } else {
      alert("Error al restaurar el servicio");
    }
  } catch (error) {
    console.error("Error al restaurar servicio:", error);
  } finally {
    handleMenuClose();
  }
};

  useEffect(() => {
    fetchServicios();
  }, []);

  const serviciosFiltrados = servicios
    .filter((s) => s.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => (showOnlyActive ? s.status : true));

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
      <Typography variant="h5" mb={2}>Servicios</Typography>
      <Paper  sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            placeholder="Buscar servicio..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
          />
            <Box display="flex" gap={2}>
  <BootstrapTooltip title={showOnlyActive ? "Mostrar todos" : "Mostrar solo activos"}>
    <IconButton color="primary" onClick={() => setShowOnlyActive(!showOnlyActive)}>
      {showOnlyActive ? <FilterListOffIcon /> : <FilterListIcon />}
    </IconButton>
  </BootstrapTooltip>

  <BootstrapTooltip title="Agregar servicio">
    <Fab size="small" color="primary" aria-label="add" onClick={() => navigate("/registro-servicio")}>
      <AddIcon />
    </Fab>
  </BootstrapTooltip>

  {/* Nuevo botón Inactivos */}
  <BootstrapTooltip title="Ver servicios inactivos">
    <Button
      variant="contained"
      color="error"
      size="small"
      onClick={() => navigate("/admin/servicios/inactivos")}
      sx={{ borderRadius: 2 }}
    >
      Inactivos
    </Button>
  </BootstrapTooltip>
</Box>
          </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map((servicio) => (
              <Grid size={{ xs: 2, sm: 4, md: 4 }} key={servicio.id}>
                <Card sx={{ borderRadius: 3, position: 'relative' }}>
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuClick(e, servicio)}
                    sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, bgcolor:'white', color: 'black' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <CardMedia sx={{ position: 'relative', height: 200 }}>
                    <Grid container spacing={1}>
                      <img src={servicio.imagenUrl || "/default-image.png"} alt={servicio.nombre} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                      <Box
    sx={{
      position: "absolute",
      top: 10,
      left: 10,
      display: "flex",
      gap: 1 // espacio entre chips
    }}
  >
    <Chip
      label={`$${servicio.precio}`}
      sx={{
        bgcolor: "rgba(0,0,0,0.7)",
        color: "white",
        fontWeight: "bold"
      }}
    />
    <Chip
      label={servicio.status ? "Activo" : "Inactivo"}
      color={servicio.status ? "success" : "error"}
      sx={{
        fontWeight: "bold"
      }}
    />
  </Box>
                      <Grid size={4}>
                      </Grid>
                    </Grid>
                  </CardMedia>
                  <CardContent>
                    <Box display="flex"
    flexDirection={isSmallScreen ? "column" : "row"}
    alignItems={isSmallScreen ? "flex-start" : "center"}
    justifyContent={isSmallScreen ? "flex-start" : "space-between"}
    gap={1} >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {servicio.nombre}
                      </Typography>
                      {servicio.categoria && (
                        <Chip
                          label={servicio.categoria.nombre}
                          size="small"
                          sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                      <Typography variant="body2" color="textSecondary">{servicio.descripcion}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No hay servicios disponibles.</Typography>
          )}
        </Grid>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
  <MenuItem onClick={handleEdit}>Editar servicio</MenuItem>
  
  {selectedServicio?.status ? (
    <MenuItem onClick={handleDeleteConfirm}>Desactivar servicio</MenuItem>
  ) : (
    <MenuItem onClick={handleRestore}>Restaurar servicio</MenuItem>

  )}
</Menu>


        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>¿Estás seguro de eliminar este servicio?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button color="error" onClick={handleDelete}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Box>
      </Paper>
      </motion.div>
    </LayoutAdmin>
  );
}

export default Servicios;
