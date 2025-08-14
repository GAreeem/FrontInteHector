import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Group as GroupIcon,
  BusinessCenter as BusinessCenterIcon,
  Category as CategoryIcon,
  Star as StarIcon,
  EventAvailable as EventAvailableIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import LayoutAdmin from "./LayoutAdmin";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const whiteColor = "#0F172A";
  const token = localStorage.getItem("token");

  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [bitacoras, setBitacoras] = useState([]);


  const [empleadosCount, setEmpleadosCount] = useState(0);
  const [clientesCount, setClientesCount] = useState(0);
  const [categoriasCount, setCategoriasCount] = useState(0);
  const [serviciosCount, setServiciosCount] = useState(0);
  const [bitacoraCount, setBitacoraCount] = useState(0);
  

  const [usuariosActivos, setUsuariosActivos] = useState(0);
  const [usuariosInactivos, setUsuariosInactivos] = useState(0);
  const [clientesActivos, setClientesActivos] = useState(0);
  const [clientesInactivos, setClientesInactivos] = useState(0);
  const [serviciosActivos, setServiciosActivos] = useState(0);
  const [serviciosInactivos, setServiciosInactivos] = useState(0);
  const [categoriasActivos, setCategoriasActivos] = useState(0);
  const [categoriasInactivos, setCategoriasInactivos] = useState(0); 

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8080/usuarios/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.result) {
        setUsuarios(data.result);
        contarRoles(data.result);
      } else {
        setUsuarios([]);
        resetCountsUsuarios();
      }
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const fetchCategorias = async () => {
  try {
    const res = await fetch("http://localhost:8080/categoria/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data && data.result) {
      setCategorias(data.result);
      contarCategorias(data.result);
    } else {
      setCategorias([]);
      resetCountCategorias();
    }
  } catch (err) {
    console.error("Error al obtener categorías:", err);
  }
};

const fetchServicios = async () => {
    try {
      const res = await fetch("http://localhost:8080/servicio/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.result) {
        setServicios(data.result);
        contarServicios(data.result);
      } else {
        setServicios([]);
        resetCountServicios();
      }
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      setServicios([]);
    }
  };

     const fetchBitacoras = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/bitacora/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBitacoras(data);
        setBitacoraCount(data.length);
      } catch (error) {
        console.error("Error al traer la bitácora", error);
        setBitacoraCount(0);
      }
    };

  const resetCountsUsuarios = () => {
    setEmpleadosCount(0);
    setClientesCount(0);
    setUsuariosActivos(0);
    setUsuariosInactivos(0);
    setClientesActivos(0);
    setClientesInactivos(0);
  };

  const resetCountCategorias = () => {
    setCategoriasCount(0);
    setCategoriasActivos(0);
    setCategoriasInactivos(0);
  };

  const resetCountServicios = () => {
    setServiciosCount(0);
    setServiciosActivos(0);
    setServiciosInactivos(0);
  };

  const contarRoles = (usuarios) => {
    const empleados = usuarios.filter((u) => u.rol.rol === "USUARIO");
    const clientes = usuarios.filter((u) => u.rol.rol === "CLIENTE");
    setEmpleadosCount(empleados.length);
    setClientesCount(clientes.length);
    setUsuariosActivos(empleados.filter((u) => u.status === true).length);
    setUsuariosInactivos(empleados.filter((u) => u.status === false).length);
    setClientesActivos(clientes.filter((u) => u.status === true).length);
    setClientesInactivos(clientes.filter((u) => u.status === false).length);
  };

  const contarCategorias = (categorias) => {
  setCategoriasCount(categorias.length);
  setCategoriasActivos(categorias.filter((c) => c.status === true).length);
  setCategoriasInactivos(categorias.filter((c) => c.status === false).length);
};

const contarServicios = (servicios) => {
  setServiciosCount(servicios.length);
  setServiciosActivos(servicios.filter((c) => c.status === true).length);
  setServiciosInactivos(servicios.filter((c) => c.status === false).length);
};

const contarBitacoras = (bitacoras) => {
  setBitacoraCount(bitacoras.length);
};


  useEffect(() => {
    fetchUsuarios();
    fetchCategorias();
    fetchServicios();
    fetchBitacoras();
  }, []);

  const pieData = [
    { name: "Empleados", value: empleadosCount },
    { name: "Clientes", value: clientesCount },
  ];

  const barData = [
    {
      name: "Usuarios",
      Activos: usuariosActivos,
      Inactivos: usuariosInactivos,
    },
    {
      name: "Clientes",
      Activos: clientesActivos,
      Inactivos: clientesInactivos,
    },
    {
      name: "Servicios",
      Activos: serviciosActivos,
      Inactivos: serviciosInactivos,
    },
    {
      name: "Categorias",
      Activos: categoriasActivos,
      Inactivos: categoriasInactivos,
    },
  ];

  const COLORS = ["#10B981", "#F59E0B"];

  const cards = [
    {
      label: "Empleados",
      value: empleadosCount,
      icon: <GroupIcon sx={{ fontSize: 40, color: "#6366F1" }} />,
      bgColor: "#EEF2FF",
      rutas: "/admin/usuarios",
    },
    {
      label: "Clientes",
      value: clientesCount,
      icon: <BusinessCenterIcon sx={{ fontSize: 40, color: "#F59E0B" }} />,
      bgColor: "#FFF7ED",
      rutas: "/admin/usuarios",
    },
    {
      label: "Categorias",
      value: categoriasCount,
      icon: <CategoryIcon sx={{ fontSize: 40, color: "#0EA5E9" }} />,
      bgColor: "#F0F9FF",
      rutas: "/admin/categorias",
    },
    {
      label: "Servicios",
      value: serviciosCount,
      icon: <StarIcon sx={{ fontSize: 40, color: "#F43F5E" }} />,
      bgColor: "#FEF2F2",
      rutas: "/admin/servicios",
    },
    {
      label: "Reservaciones",
      value: "",
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: "#10B981" }} />,
      bgColor: "#ECFDF5",
      rutas: "/admin/reservaciones",
    },
    {
      label: "Historial",
      value: bitacoraCount,
      icon: <HistoryIcon sx={{ fontSize: 40, color: "#6366F1" }} />,
      bgColor: "#EEF2FF",
      rutas: "/admin/bitacora",
    },
  ];

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {cards.map((card, index) => (
            <Grid key={index} sx={{ flex: "1 1 180px", maxWidth: "180px" }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  backgroundColor: card.bgColor,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                  width: "100%",
                }}
                 onClick={() => navigate(card.rutas)}
                elevation={0}
              >
                <Box display="flex" justifyContent="center" mb={1}>
                  {card.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ color: whiteColor }}>
                  {card.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: whiteColor }}
                >
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mt={5}>
          <Grid size={{ xs: 6, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "100%",
              }}
              elevation={3}
            >
              <Typography variant="h5" sx={{ mb: 2, color: whiteColor, textAlign: 'center' }}>
                Distribución de Usuarios
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span style={{ color: whiteColor }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6, md: 8}}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "100%",
                width: "100%",
              }}
              elevation={3}
            >
              <Typography variant="h5" sx={{ mb: 2, color: whiteColor, textAlign: 'center' }}>
                Estados
              </Typography>
           <ResponsiveContainer width="100%" height={300}>
  <BarChart data={barData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar
      dataKey="Activos"
      fill="#10B981"
      shape={(props) => {
        const { x, y, width, height, fill } = props;
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            rx={10} // BorderRadius X
            ry={10} // BorderRadius Y
          />
        );
      }}
    />
    
    <Bar
      dataKey="Inactivos"
      fill="#F43F5E"
      shape={(props) => {
        const { x, y, width, height, fill } = props;
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            rx={10} 
            ry={10}
          />
        );
      }}
    />
    
  </BarChart>
</ResponsiveContainer>

            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </LayoutAdmin>
  );
};

export default AdminHome;