import React, { useState } from "react";
import {AppBar, Box, CssBaseline, Link, Typography, useTheme, useMediaQuery,Container } from "@mui/material";
import ClientDrawer from "./ClientDrawer";

const drawerWidth = 240;

const LayoutCliente = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

   return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: '#fffffffc' }}>
      <CssBaseline />
      <ClientDrawer />
      <Container sx={{ mt: 0, mb: 0, flexGrow: 1 }}>{children}</Container>
      <Box
      component="footer"
      sx={{
        bgcolor: "#0c1015e8",
        color: "#fff",
        py: 2,
        px: 2,
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        © 2025 RESVY | Sistema de Gestión de Reservas y Servicios
      </Typography>
      <Typography variant="body2" color="gray">
        Desarrollado por los más insanos | <Link href="#" underline="hover" color="inherit">Privacidad</Link> | <Link href="#" underline="hover" color="inherit">Términos</Link>
      </Typography>
    </Box>
    </Box>
  );
}

export default LayoutCliente;