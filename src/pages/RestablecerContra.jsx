import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function RestablecerContra() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Obtener el token desde la URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (res.ok) {
        alert("Tu contraseña ha sido restablecida correctamente.");
        navigate("/login"); // Redirigir al Login
      } else {
        alert("Error al restablecer la contraseña. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Centrar verticalmente
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom align="center">
          Restablecer Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nueva Contraseña"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirmar Contraseña"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Restablecer Contraseña
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default RestablecerContra;