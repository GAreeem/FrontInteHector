import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, Fab, InputAdornment, TablePagination, IconButton, styled
} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Swal from "sweetalert2";
import LayoutAdmin from "./LayoutAdmin";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from "@mui/icons-material/Restore";
import Chip from "@mui/material/Chip";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { motion } from "framer-motion";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(false); 

  const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

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
    const url = editing ? `http://localhost:8080/categoria/${editing.idCategoriaServicio}` : "http://localhost:8080/categoria/";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editing ? { ...form, idCategoriaServicio: editing.idCategoriaServicio } : form),
    });

    if (res.ok) {
      fetchCategorias();
      handleClose();
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

  const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   const filteredCategorias = useMemo(() => {
  return categorias
    .filter((cat) =>
      `${cat.nombre}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((cat) => (showOnlyActive ? cat.status : true)); // <-- Nuevo filtro por activos
}, [categorias, search, showOnlyActive]);

  
  
    const sortedCategorias = useMemo(() => {
      return [...filteredCategorias].sort((a, b) => {
          const valA = `${a.nombre} ${a.apellidoP} ${a.apellidoM}`.toLowerCase();
          const valB = `${b.nombre} ${b.apellidoP} ${b.apellidoM}`.toLowerCase();
          if (valA < valB) return order === 'asc' ? -1 : 1;
          if (valA > valB) return order === 'asc' ? 1 : -1;
          return 0;
      });
  }, [filteredCategorias, order]);
  
  
      const visibleRows = sortedCategorias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
      <Paper  sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Buscar categoria"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                     <Box display="flex" gap={2}>
    <BootstrapTooltip title={showOnlyActive ? "Mostrar todas" : "Mostrar solo activos"}>
    <IconButton
      variant={showOnlyActive ? "contained" : "outlined"}
      onClick={() => setShowOnlyActive(!showOnlyActive)}
    >
      {showOnlyActive ? <FilterListOffIcon /> : <FilterListIcon />}
    </IconButton>
    </BootstrapTooltip>
    <BootstrapTooltip title="Agregar">
      <Fab size="small" color="primary" aria-label="add" onClick={() => handleOpen()}>
        <AddIcon />
      </Fab>
    </BootstrapTooltip>
  </Box>
                </Box>
                     <TableContainer>
                    <Table sx={{ minWidth: 750, '& td, & th': { textAlign: 'center' } }}>
                        <TableHead>
                            <TableRow>
                                   <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
            {visibleRows.map((cat) => (
              <TableRow key={cat.idCategoriaServicio}>
                <TableCell>{cat.idCategoriaServicio}</TableCell>
                <TableCell>{cat.nombre}</TableCell>
                <TableCell>{cat.descripcion}</TableCell>
                <TableCell><Chip label={cat.status ? "Activo" : "Inactivo"} color={cat.status ? "success" : "error"} /></TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <BootstrapTooltip title="Editar">
                  <IconButton size="small" onClick={() => handleOpen(cat)}><EditIcon /></IconButton></BootstrapTooltip>
                  {cat.status ? (
                     <BootstrapTooltip title="Deshabilitar">
                    <IconButton size="small" color="error" onClick={() => handleDelete(cat.idCategoriaServicio)}>
                      <BlockIcon />
                    </IconButton>
                    </BootstrapTooltip>
                  ) : (
                     <BootstrapTooltip title="Restaurar">
                    <IconButton size="small" color="success" onClick={() => handleRestore(cat.idCategoriaServicio)}>
                      <RestoreIcon />
                    </IconButton>
                    </BootstrapTooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedCategorias.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
      </Paper>
    <Box p={3}>
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