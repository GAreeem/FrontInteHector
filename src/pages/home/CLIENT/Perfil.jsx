import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import LayoutCliente from "../CLIENT/LayoutCliente";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";

const PerfilCliente = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:8080/usuarios/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener datos del usuario");
        const data = await res.json();
        console.log("RESPUESTA API:", data.result);
        setUsuario(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) {
    return (
      <LayoutCliente>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </LayoutCliente>
    );
  }

  if (!usuario) {
    return (
      <LayoutCliente>
        <Container>
          <Typography variant="h5" color="error">
            No se pudieron cargar los datos del perfil.
          </Typography>
        </Container>
      </LayoutCliente>
    );
  }

  return (
    <LayoutCliente>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background: "linear-gradient(to bottom right, #ffffff, #f4f6f8)",
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              mb: 2,
              boxShadow: 3,
              mx: "auto",
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>

          {/* Nombre */}
          <Typography variant="h4" fontWeight="bold">
            {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
          </Typography>

          {/* Email */}
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="subtitle1" color="text.secondary">
              {usuario.email}
            </Typography>
          </Box>

          {/* Teléfono */}
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body1">{usuario.telefono}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Rol */}
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <BadgeIcon sx={{ color: "primary.main" }} />
            <Chip
              label={usuario.rol?.rol}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            />
          </Box>

          {/* Estado */}
          <Chip
            label={usuario.status ? "Activo" : "Inactivo"}
            color={usuario.status ? "success" : "error"}
            sx={{ mt: 2 }}
          />
        </Paper>
      </Container>
    </LayoutCliente>
  );
};

export default PerfilCliente;
