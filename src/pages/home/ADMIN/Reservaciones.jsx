import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import { CalendarToday, AccessTime, Cancel } from "@mui/icons-material";
import LayoutAdmin from "./LayoutAdmin";
import { motion } from "framer-motion";

const Reservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [reservaACancelar, setReservaACancelar] = useState(null);
  const idUser = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");

  // Cargar reservaciones
  useEffect(() => {
    if (!idUser || !token) return;

    const cargarReservaciones = async () => {
      try {
        const res = await fetch(`http://localhost:8080/reservacion/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) throw new Error("Error al obtener reservaciones");
        const data = await res.json();
        setReservaciones(data.result || []);
      } catch (err) {
        console.error(err);
        mostrarSnackbar("Error al cargar reservaciones", "error");
      }
    };

    cargarReservaciones();
  }, [idUser, token]);

  // Función para mostrar notificación
  const mostrarSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Manejar apertura del diálogo
  const handleOpenDialog = (reserva) => {
    setReservaACancelar(reserva);
    setOpenDialog(true);
  };

  // Manejar cierre del diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Cancelar reservación
  const handleCancelarReservacion = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservacion/cancelar/${reservaACancelar.idReservacion}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error al cancelar reservación");
      }

      // Actualizar estado local
      setReservaciones(reservaciones.map(r => 
        r.idReservacion === reservaACancelar.idReservacion 
          ? { ...r, status: false } 
          : r
      ));

      mostrarSnackbar("Reservación cancelada correctamente", "success");
    } catch (error) {
      console.error("Error:", error);
      mostrarSnackbar(error.message || "Error al cancelar reservación", "error");
    } finally {
      handleCloseDialog();
    }
  };

  // Formatear fecha
  const formatFecha = (fechaString) => {
    if (!fechaString) return "Fecha no especificada";
    
    try {
      const fecha = new Date(fechaString);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
      let horas = fecha.getHours();
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12;

      return `${dia}/${mes}/${año} ${horas}:${minutos} ${ampm}`;
    } catch (e) {
      return fechaString;
    }
  };

  return (
    <LayoutAdmin>
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Reservaciones
        </Typography>

        {reservaciones.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary">
            No tienes reservaciones activas.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {reservaciones.map((reserva) => (
              <Card key={reserva.idReservacion} sx={{ display: "flex", borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 300 }}
                  image={reserva.servicio?.imagenUrl || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                  alt={reserva.servicio?.nombre}
                />
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5" fontWeight="bold">
                    {reserva.servicio?.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                    {reserva.servicio?.descripcion}
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography>Precio:</Typography>
                    <Typography fontWeight="bold" color="primary">
                      ${reserva.servicio?.precio?.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarToday sx={{ mr: 0.5, fontSize: "small" }} />
                      <Typography variant="body2">
                        {formatFecha(reserva.reservationDate).split(" ")[0]}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ mr: 0.5, fontSize: "small" }} />
                      <Typography variant="body2">
                        {formatFecha(reserva.reservationDate).split(" ")[1]} {formatFecha(reserva.reservationDate).split(" ")[2]}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Chip
                      label={reserva.status ? "Confirmada" : "Cancelada"}
                      color={reserva.status ? "success" : "error"}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleOpenDialog(reserva)}
                      disabled={!reserva.status}
                      size="small"
                    >
                      Cancelar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Diálogo de confirmación */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmar cancelación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro que deseas cancelar la reservación de "{reservaACancelar?.servicio?.nombre}"?
            </DialogContentText>
            <DialogContentText sx={{ mt: 2, fontStyle: "italic" }}>
              Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Volver</Button>
            <Button 
              onClick={handleCancelarReservacion} 
              color="error"
              variant="contained"
              autoFocus
            >
              Confirmar cancelación
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notificación */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      </motion.div>
    </LayoutAdmin>
  );
};

export default Reservaciones;