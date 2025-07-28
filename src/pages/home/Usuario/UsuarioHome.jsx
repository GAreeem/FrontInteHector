import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutUsuario from './LayoutUsuario';
import { Typography, Box, Alert } from '@mui/material';

const UsuarioHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <LayoutUsuario>
      <Box sx={{ mt: 0 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a tu panel de proveedor de servicios
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          Este es tu espacio personal para ofrecer servicios dentro del sistema.
          Asegúrate de que toda la información proporcionada sea <strong>verídica, clara y actualizada</strong>,
          ya que será visible para los clientes interesados en tus servicios.
        </Alert>

        <Typography variant="body1" sx={{ mt: 3 }}>
          Desde aquí podrás registrar tus servicios, gestionarlos, revisar reservaciones
          y mantener tus datos actualizados. Recuerda que mantener una buena presentación
          y descripción ayuda a atraer más clientes.
        </Typography>
      </Box>
    </LayoutUsuario>
  );
};

export default UsuarioHome;
