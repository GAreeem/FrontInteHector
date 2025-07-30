import React, { useState } from "react";
import {AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, useTheme, useMediaQuery,Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <ClientDrawer />
      <Container sx={{ mt: 0, mb: 0, flexGrow: 1 }}>{children}</Container>
    </Box>
  );
}

export default LayoutCliente;