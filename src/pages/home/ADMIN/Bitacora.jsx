import React, { useEffect, useState } from "react";
import LayoutAdmin from "../ADMIN/LayoutAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
Typography,
  Paper,
  TablePagination,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Bitacora = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [filteredBitacoras, setFilteredBitacoras] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
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
        setFilteredBitacoras(data);
      } catch (error) {
        console.error("Error al traer la bitácora", error);
      }
    };
    fetchBitacoras();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = bitacoras.filter((b) =>
      b.usuario.toLowerCase().includes(value)
    );
    setFilteredBitacoras(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEliminarBitacora = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:8080/bitacora/limpiar", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            Swal.fire("¡Eliminado!", "La bitácora ha sido limpiada.", "success");
            setBitacoras([]);
            setFilteredBitacoras([]);
          } else {
            Swal.fire("Error", "No se pudo eliminar la bitácora.", "error");
          }
        } catch (error) {
          console.error("Error al eliminar bitácora", error);
          Swal.fire("Error", "No se pudo eliminar la bitácora.", "error");
        }
      }
    });
  };

  return (
    <LayoutAdmin>
        <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
              >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Registro de Bitácora
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Buscar por usuario"
            variant="outlined"
            value={search}
            onChange={handleSearch}
          />
          <Button variant="contained" color="error" onClick={handleEliminarBitacora}>
            Limpiar Bitácora
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Endpoint</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBitacoras
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.usuario}</TableCell>
                    <TableCell>{b.metodoHttp}</TableCell>
                    <TableCell>{b.endpoint}</TableCell>
                    <TableCell>{b.descripcion}</TableCell>
                    <TableCell>{new Date(b.fechaHora).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredBitacoras.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      </motion.div>
    </LayoutAdmin>
  );
};

export default Bitacora;
