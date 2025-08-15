import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Link, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import LayoutAdmin from "./LayoutAdmin";
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion";

const RegisterEmployee = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // Campos para usuarios
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const agregarUsuario = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const errors = [];
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{2,30}$/;
        const emailPattern = /^(?=[a-z0-9._%+-]{6,30}@(gmail\.com|utez\.edu\.mx)$)(?!.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,}).*$/;
        const phonePattern = /^\d{10}$/;
        const passwordPattern = /^.{8,30}$/;

        if (!namePattern.test(nombre)) {
            errors.push("El nombre debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!namePattern.test(apellidoP)) {
            errors.push("El apellido paterno debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!namePattern.test(apellidoM)) {
            errors.push("El apellido materno debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!emailPattern.test(email)) {
            errors.push("Correo inválido. Debe ser @gmail.com o @utez.edu.mx, entre 6 y 30 caracteres.");
        }

        if (!phonePattern.test(telefono)) {
            errors.push("El teléfono debe tener exactamente 10 dígitos.");
        }

        if (!passwordPattern.test(password)) {
            errors.push("La contraseña debe tener entre 8 y 30 caracteres.");
        }

        if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
            return;
        }
        setLoading(true);
        setSuccess(false);
        const payload = { nombre, apellidoP, apellidoM, email, telefono, password, idRol: 2 };
        try {
            const res = await fetch("http://localhost:8080/usuarios/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/admin/usuarios");
                }, 1500);
            } else {
                setErrorMessage("Algo salió mal, intente de nuevo.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <LayoutAdmin>
            <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 3 }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Registrar empleado
                        </Typography>
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                        Completa el formulario para registrar un nuevo empleado
                    </Typography>
                    <form onSubmit={agregarUsuario}>
                        <Box gap={2}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Nombre"
                                        variant="standard"
                                        value={nombre}
                                        type="text"
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid  sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Apellido Paterno"
                                        variant="standard"
                                        value={apellidoP}
                                        type="text"
                                        onChange={(e) => setApellidoP(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Apellido Materno"
                                        variant="standard"
                                        value={apellidoM}
                                        type="text"
                                        onChange={(e) => setApellidoM(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Correo electrónico"
                                        variant="standard"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
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
                                </Grid>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Teléfono"
                                        variant="standard"
                                        value={telefono}
                                        type="number"
                                        onChange={(e) => setTelefono(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="center">
                                {errorMessage && (
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        {errorMessage.split("\n").map((msg, index) => (
                                            <Typography key={index} color="error" variant="body2" align="center">
                                                {msg}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                            <Box mt={3} display="flex" justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: success ? 'success.main' : '#1D4ED8',
                                        borderRadius: 2,
                                        px: 4,
                                        height: 60,
                                        maxWidth: 450,
                                        minWidth: 200,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&:hover': {
                                            backgroundColor: success ? 'success.dark' : '#153BB0',
                                        },
                                    }}
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={30} sx={{ color: 'white' }} />
                                    ) : success ? (
                                        <CheckIcon sx={{ color: 'white', fontSize: 30 }} />
                                    ) : (
                                        <Typography variant="button" sx={{ color: 'white' }}>
                                            Registrar Empleado
                                        </Typography>
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography onClick={() => navigate("/admin/usuarios")} variant="body2" sx={{ color: '#1D4ED8', cursor: 'pointer' }}>
                            Volver a Usuarios
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            </motion.div>
        </LayoutAdmin>
    );
}
export default RegisterEmployee;