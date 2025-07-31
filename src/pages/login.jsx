import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);

        switch (data.rol) {
          case "ADMIN":
            navigate("/inicio");
            break;
          case "USUARIO":
            navigate("/usuario");
            break;
          case "CLIENTE":
            navigate("/cliente");
            break;
          default:
            alert("Rol no reconocido");
            break;
        }
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Correo electrónico"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Contraseña"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/registro")}
            >
              Registrar cuenta
            </Button>
            <Typography variant="body2" color="primary" align="center" sx={{ cursor: "pointer", marginTop: 10 }} onClick={() => navigate("/recuperar-contrasena")}>
              ¿Olvidaste tu contraseña?
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
