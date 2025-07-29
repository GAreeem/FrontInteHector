import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";
import { motion } from "framer-motion";
import {
  Group as GroupIcon,
  Category as CategoryIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  EventAvailable as EventAvailableIcon,
  Visibility as VisibilityIcon,
  PictureAsPdf as PictureAsPdfIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const AdminHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <Typography variant="h4" sx={{ color: "var(--beige-dark)", mb: 2 }}>
          Bienvenido al Panel de Administrador
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Gestiona todas tus invitaciones de forma rápida y eficiente.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3} style={{ backgroundColor: "#1F2937", width: "300px" }}>
              <GroupIcon sx={{ fontSize: 40, color: "white" }} />
              <Typography variant="h6" sx={{ mt: 2 }} style={{ color: "white" }}>
                Usuarios
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Gestionar
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3} style={{ backgroundColor: "#1F2937", width: "300px" }}>
              <CategoryIcon sx={{ fontSize: 40, color: "white" }} />
              <Typography variant="h6" sx={{ mt: 2 }} style={{ color: "white" }}>
                Gestión de categorías
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/categorias')}>
                  Gestionar
                </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3} style={{ backgroundColor: "#1F2937", width: "300px" }}>
              <EventAvailableIcon sx={{ fontSize: 40, color: "white" }} />
              <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
                Bitacora
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/bitacora")}>
                Ver Actividades
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3}>
              <EmailIcon sx={{ fontSize: 40, color: "var(--beige-primary)", mr: 1 }} />
              <WhatsAppIcon sx={{ fontSize: 40, color: "var(--beige-primary)" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Envío por Correo y WhatsApp
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Enviar
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3}>
              <VisibilityIcon sx={{ fontSize: 40, color: "var(--beige-primary)" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Seguimiento de Correos
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Ver Seguimiento
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3}>
              <PictureAsPdfIcon sx={{ fontSize: 40, color: "var(--beige-primary)" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Exportar Invitación PDF/PNG
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Exportar
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3}>
              <FileDownloadIcon sx={{ fontSize: 40, color: "var(--beige-primary)" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Listado de Confirmaciones
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Exportar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </LayoutAdmin>
  );
};

export default AdminHome;
