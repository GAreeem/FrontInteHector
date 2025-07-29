import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import LayoutAdmin from "./LayoutAdmin";
import { motion } from "framer-motion";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const token = localStorage.getItem("token");

  const fetchCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/categoria/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
       if (data && data.result) {
      setCategorias(data.result); // <-- aquí está la clave
    } else {
      setCategorias([]);
    }
    console.log(data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };
  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleOpen = (data = null) => {
    setEditing(data);
    setForm(data ? { nombre: data.nombre, descripcion: data.descripcion } : { nombre: "", descripcion: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(null);
    setOpen(false);
    setForm({ nombre: "", descripcion: "" });
  };

  const handleSave = async () => {
  const url = editing
    ? `http://localhost:8080/categoria/${editing.idCategoriaServicio}`
    : "http://localhost:8080/categoria/";
  const method = editing ? "PUT" : "POST";

  const payload = editing
    ? {
        idCategoriaServicio: editing.idCategoriaServicio,
        nombre: form.nombre !== "" ? form.nombre : editing.nombre,
        descripcion: form.descripcion !== "" ? form.descripcion : editing.descripcion,
      }
    : form;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    fetchCategorias();
    handleClose();
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu categoría ha sido actualizada",
        showConfirmButton: false,
        timer: 1500,
      });
  } else {
    const errorData = await res.json();
    Swal.fire("Error", errorData.message || "Error en la operación", "error");
  }
};


  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/categoria/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchCategorias();
  };

  const handleRestore = async (id) => {
    const res = await fetch(`http://localhost:8080/categoria/restaurar/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchCategorias();
  };

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Gestión de Categorías
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Crear Categoría
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((cat) => (
              <TableRow key={cat.idCategoriaServicio}>
                <TableCell>{cat.idCategoriaServicio}</TableCell>
                <TableCell>{cat.nombre}</TableCell>
                <TableCell>{cat.descripcion}</TableCell>
                <TableCell>{cat.status ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpen(cat)}>Editar</Button>
                  {cat.status ? (
                    <Button size="small" color="error" onClick={() => handleDelete(cat.idCategoriaServicio)}>
                      Deshabilitar
                    </Button>
                  ) : (
                    <Button size="small" color="success" onClick={() => handleRestore(cat.idCategoriaServicio)}>
                      Restaurar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? "Actualizar" : "Crear"} Categoría</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </motion.div>
    </LayoutAdmin>
  );
};

export default Categorias;
