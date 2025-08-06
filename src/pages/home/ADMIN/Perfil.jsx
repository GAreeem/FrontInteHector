import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  Button
} from "@mui/material";
import LayoutAdmin from "../ADMIN/LayoutAdmin";
import PersonIcon from '@mui/icons-material/Person';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const idUser = localStorage.getItem("idUser"); 
        const res = await fetch(`http://localhost:8080/usuarios/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener datos del usuario");
        const data = await res.json();
        setUsuario(data.data); 
        console.log(data)
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
      <LayoutAdmin>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </LayoutAdmin>
    );
  }

  if (!usuario) {
    return (
      <LayoutAdmin>
        <Container>
          <Typography variant="h5" color="error">No se pudieron cargar los datos del perfil.</Typography>
        </Container>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4">{`${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM}`}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{usuario.email}</Typography>
            <Typography variant="body1">Teléfono: {usuario.telefono}</Typography>
            <Chip
              label={usuario.rol.rol}
              color="primary"
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <Chip
              label={usuario.status ? "Activo" : "Inactivo"}
              color={usuario.status ? "success" : "error"}
              sx={{ mt: 1 }}
            />
            <Button variant="contained" sx={{ mt: 3 }}>Editar Perfil</Button>
          </Box>
        </Paper>
      </Container>
    </LayoutAdmin>
  );
};

export default PerfilUsuario;
