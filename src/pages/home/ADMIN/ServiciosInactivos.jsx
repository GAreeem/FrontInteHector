import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography
} from "@mui/material";
import Swal from "sweetalert2";
import AdminLayout from "../ADMIN/LayoutAdmin";
import { motion } from "framer-motion";

function ServiciosInactivos() {
  const [servicios, setServicios] = useState([]);

  const token = localStorage.getItem("token");

  const fetchServicios = async () => {
    try {
      const res = await fetch("http://localhost:8080/servicio/inactivos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setServicios(data.result || []);
    } catch (error) {
      console.error("Error al obtener servicios inactivos:", error);
    }
  };

  const activarServicio = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este servicio será activado nuevamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, activar"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/servicio/activar/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          Swal.fire("¡Activado!", "El servicio ha sido activado.", "success");
          fetchServicios();
        } else {
          Swal.fire("Error", "No se pudo activar el servicio.", "error");
        }
      } catch (error) {
        console.error("Error activando servicio:", error);
        Swal.fire("Error", "Error al conectar con el servidor.", "error");
      }
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
      <Paper sx={{ padding: 4, margin: 4 }}>
        <Typography variant="h5" gutterBottom>
          Servicios Inactivos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white" }}>Descripción</TableCell>
                <TableCell sx={{ color: "white" }}>Precio</TableCell>
                <TableCell sx={{ color: "white" }}>Estado</TableCell>
                <TableCell sx={{ color: "white" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <TableRow key={servicio.idServicio}>
                    <TableCell>{servicio.nombre}</TableCell>
                    <TableCell>{servicio.descripcion}</TableCell>
                    <TableCell>${servicio.precio}</TableCell>
                    <TableCell>{servicio.status ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => activarServicio(servicio.idServicio)}
                      >
                        Activar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay servicios inactivos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </motion.div>
    </AdminLayout>
  );
}

export default ServiciosInactivos;
