import React, { useEffect, useState } from "react";
import LayoutAdmin from "../ADMIN/LayoutAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  Box,
  InputAdornment,
  Chip
} from "@mui/material";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';

const Bitacora = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [filteredBitacoras, setFilteredBitacoras] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterMethod, setFilterMethod] = useState("Todos");

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
    applyFilters(value, filterMethod);
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

  const applyFilters = (searchValue, methodValue) => {
    let filtered = bitacoras.filter((b) =>
      b.usuario.toLowerCase().includes(searchValue)
    );
    if (methodValue !== "Todos") {
      filtered = filtered.filter((b) => b.metodoHttp === methodValue);
    }
    setFilteredBitacoras(filtered);
  };

  const handleFilterMethod = (method) => {
    setFilterMethod(method);
    applyFilters(search, method);
    setPage(0);
  };

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p={2}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar usuario"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip label="Todos" onClick={() => handleFilterMethod("Todos")} color={filterMethod === "Todos" ? "primary" : "default"} />
              <Chip label="POST" onClick={() => handleFilterMethod("POST")} sx={{ backgroundColor: "#fff3cd", fontWeight: 'bold' }} />
              <Chip label="PUT" onClick={() => handleFilterMethod("PUT")} sx={{ backgroundColor: "#e6d0f7", fontWeight: 'bold' }} />
              <Chip label="DELETE" onClick={() => handleFilterMethod("DELETE")} sx={{ backgroundColor: "#f8d7da", fontWeight: 'bold' }} />
              <Button variant="contained" color="error" onClick={handleEliminarBitacora}>
                Limpiar Bitácora
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 750, '& td, & th': { textAlign: 'center' } }}>
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
                      <TableCell><Chip label={b.metodoHttp} sx={{
                        backgroundColor:
                          b.metodoHttp === "POST" ? "#ffe283ff" : b.metodoHttp === "PUT" ? "#c982ffff" :
                            b.metodoHttp === "DELETE" ? "#ff808aff" : "#e0e0e0", color: '#3f3f3fff', fontWeight: 'bold'
                      }} /></TableCell>
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
        </Paper>

      </motion.div>
    </LayoutAdmin>
  );
};

export default Bitacora;
