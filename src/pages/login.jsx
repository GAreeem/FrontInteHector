import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoResvy from "../assets/logo_sin.png";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage("");

  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (!data.usuario.status) {
        setErrorMessage("Tu cuenta está inactiva, contacta con el administrador.");
        return; 
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.usuario.idUser);
      localStorage.setItem("rol", data.usuario.rol.rol);

      switch (data.usuario.rol.rol) {
        case "ADMIN":
          navigate("admin/inicio");
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
      setPassword("");
      setErrorMessage("Credenciales incorrectas");
    }
  } catch (error) {
    alert("Error al conectar con el servidor.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "calc(100vh - 60px)" }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <img src={LogoResvy} alt="Logo Resvy" width={30} style={{ marginRight: 4 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Resvy
          </Typography>
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Correo electrónico"
              variant="standard"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <FormControl variant="standard" fullWidth required>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#1D4ED8',
                borderRadius: 2,
                height: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#153BB0',
                },
              }}
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={30} sx={{ color: 'white' }} />
              ) : (
                <NavigateNextIcon sx={{ fontSize: 40, color: 'white' }} />
              )}
            </Button>
            {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}
          </Box>
        </form>
         <Box textAlign="center" mt={3}>
          <Link
            component="button"
            variant="body1"
            underline="always"
            onClick={() => navigate("/recuperar-contrasena")}
           
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
        <Box textAlign="center" mt={1}>
          <Link
            component="button"
            variant="body1"
            underline="always"
            onClick={() => navigate("/registro")}
            sx={{ fontWeight: 'bold' }}
          >
            Registrarme
          </Link>
        </Box>
        {/*  <Box mt={4}>
          <Typography variant="body2" align="center">
            Al continuar, declaras que leíste y{' '}
            <Link href="#" underline="always">aceptas nuestros Términos y condiciones</Link>, el{' '}
            <Link href="#" underline="always">Aviso de privacidad</Link>, y los{' '}
            <Link href="#" underline="always">Términos y condiciones de Resvy.com</Link>.
          </Typography>
        </Box>
        */}
      </Paper>
    </Container>
  );
}

export default Login;
