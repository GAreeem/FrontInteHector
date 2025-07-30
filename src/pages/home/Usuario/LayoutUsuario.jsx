import React, { useState } from "react";
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, useTheme, useMediaQuery, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UsuarioDrawer from "./UsuarioDrawer";

const drawerWidth = 240;

const LayoutUsuario = ({ children }) => {
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
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#1F2937" }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Resvy
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer escritorio */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                    },
                }}
                open
            >
                <UsuarioDrawer logout={logout} />
            </Drawer>

            {/* Drawer móvil */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                    },
                }}
            >
                <UsuarioDrawer logout={logout} />
            </Drawer>

            {/* Contenido */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: "#f9f9f9",
                    minHeight: "100vh",
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default LayoutUsuario;