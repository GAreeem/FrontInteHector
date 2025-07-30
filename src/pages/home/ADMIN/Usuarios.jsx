import React, { useEffect, useState, useMemo } from "react";
import { Box, Table, TableBody,  TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, IconButton, TextField,
    InputAdornment, Collapse, Typography, Chip, Button,  Grid,  Dialog, DialogTitle, DialogContent, DialogActions, styled,
} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import LayoutAdmin from "./LayoutAdmin";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nombre');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [openRow, setOpenRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [form, setForm] = useState({idUser: "", nombre: "", apellidoP: "", apellidoM: "", email: "", telefono: "", rol: "" });
    const [editing, setEditing ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [showOnlyActive, setShowOnlyActive] = useState(false); 

    const navigate = useNavigate();

    const token = localStorage.getItem("token");    

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
    

    const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

    const fetchUsuarios = async () => {
        try {
            const res = await fetch("http://localhost:8080/usuarios/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data && data.result) {
                setUsuarios(data.result);
            } else {
                setUsuarios([]);
            }
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    const desahabilitarUsuarios = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/usuarios/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchUsuarios();
                setOpenRow(null);
            }
            else {
                alert("Algo salió mal, intente de nuevo.");
            }
        } catch (err) {
            console.error("Error al deshabilitar usuario:", err);
        } finally {
            setLoading(false);
        }
    };

    const restaurarUsuarios = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/usuarios/restaurar/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchUsuarios();
                setOpenRow(null);
            }
            else {
                alert("Algo salió mal, intente de nuevo.");
            }
        } catch (err) {
            console.error("Error al resataurar usuario:", err);
        } finally {
            setLoading(false);
        }
    };

    const actualizarUsuario = async (e) => {
       e.preventDefault();
        setErrorMessage("");
        const errors = [];
        const {idUser, nombre, apellidoP, apellidoM, email, telefono, idRol } = form;
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{2,30}$/;
        const emailPattern = /^(?=[a-z0-9._%+-]{6,30}@(gmail\.com|utez\.edu\.mx)$)(?!.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,}).*$/;
        const phonePattern = /^\d{10}$/;

          if (!namePattern.test(nombre)) {
            errors.push("El nombre debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!namePattern.test(apellidoP)) {
            errors.push("El apellido paterno debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!namePattern.test(apellidoM)) {
            errors.push("El apellido materno debe tener solo letras, sin espacios, entre 2 y 30 caracteres.");
        }

        if (!emailPattern.test(email)) {
            errors.push("Correo inválido. Debe ser @gmail.com o @utez.edu.mx, entre 6 y 30 caracteres.");
        }

        if (!phonePattern.test(telefono)) {
            errors.push("El teléfono debe tener exactamente 10 dígitos.");
        }

         if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
            return;
        }
        setLoadingEdit(true);
        setSuccess(false);

        const payload = {idUser, nombre, apellidoP, apellidoM, email, telefono, idRol: idRol };
        console.log("Payload:", payload);
        try {
            const res = await fetch(`http://localhost:8080/usuarios/${idUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                fetchUsuarios();
                setSuccess(false);
                setEditing(false);
                 setOpenRow(null);
                }, 1500);
            } else {
                setErrorMessage("Algo salió mal, intente de nuevo.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        } finally {
            setLoadingEdit(false);
            
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

const handleOpen = (usuario) => {
    setForm({
        idUser: usuario.idUser,
        nombre: usuario.nombre,
        apellidoP: usuario.apellidoP,
        apellidoM: usuario.apellidoM,
        email: usuario.email,
        telefono: usuario.telefono,
        idRol:  usuario.rol.idRol,
    });
    setEditing(true);
};

const handleClose = () => {
    setForm({ nombre: "", apellidoP: "", apellidoM: "", email: "", telefono: "" });
    setErrorMessage("");
    setSuccess(false);
    setLoadingEdit(false);
    setOpenRow(null);
    setEditing(false);
};

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        desahabilitarUsuarios(id);
    };

   const filteredUsuarios = useMemo(() => {
    return usuarios
        .filter((usu) => usu.rol.rol.toLowerCase() !== "admin")
        .filter((usu) =>
            `${usu.nombre} ${usu.apellidoP} ${usu.apellidoM}`.toLowerCase().includes(search.toLowerCase()) ||
            usu.email.toLowerCase().includes(search.toLowerCase())
        ).filter((usu) => (showOnlyActive ? usu.status : true)); 
}, [usuarios, search, showOnlyActive]);

  const sortedUsuarios = useMemo(() => {
    return [...filteredUsuarios].sort((a, b) => {
        const valA = `${a.nombre} ${a.apellidoP} ${a.apellidoM}`.toLowerCase();
        const valB = `${b.nombre} ${b.apellidoP} ${b.apellidoM}`.toLowerCase();
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
}, [filteredUsuarios, order]);


    const visibleRows = sortedUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <LayoutAdmin>
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
                   <Dialog open={editing} onClose={() => setEditing(false)}>
                        <DialogTitle>Editar usuario</DialogTitle>
                        <form onSubmit={actualizarUsuario}> 
                        <DialogContent>
                        <Box gap={2}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Nombre"
                                        variant="standard"
                                        value={form.nombre}
                                        type="text"
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid  sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Apellido Paterno"
                                        variant="standard"
                                        value={form.apellidoP}
                                        type="text"
                                        onChange={(e) => setForm({ ...form, apellidoP: e.target.value })}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Apellido Materno"
                                        variant="standard"
                                        value={form.apellidoM}
                                        type="text"
                                        onChange={(e) => setForm({ ...form, apellidoM: e.target.value })}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Correo electrónico"
                                        variant="standard"
                                        value={form.email}
                                        type="email"
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid sx={{mb: 2}} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        label="Teléfono"
                                        variant="standard"
                                        value={form.telefono}
                                        type="number"
                                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="center">
                                {errorMessage && (
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        {errorMessage.split("\n").map((msg, index) => (
                                            <Typography key={index} color="error" variant="body2" align="center">
                                                {msg}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancelar</Button>
                             <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: success ? 'success.main' : '#1D4ED8',
                                        borderRadius: 2, 
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&:hover': {
                                            backgroundColor: success ? 'success.dark' : '#153BB0',
                                        },
                                    }}
                                    
                                    disabled={loadingEdit}
                                >
                                    {loadingEdit ? (
                                        <CircularProgress size={30} sx={{ color: 'white' }} />
                                    ) : success ? (
                                        <CheckIcon sx={{ color: 'white', fontSize: 30 }} />
                                    ) : (
                                        <Typography variant="button" sx={{ color: 'white' }}>
                                            Actualizar usuario
                                        </Typography>
                                    )}
                                </Button>
                        </DialogActions>
                          </form >
                      </Dialog>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Buscar usuario"
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
      <Fab size="small" color="primary" aria-label="add" onClick={() => navigate("/registro-empleado")}>
        <AddIcon />
      </Fab>
    </BootstrapTooltip>
  </Box>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 750, '& td, & th': { textAlign: 'center' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell ></TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((usu, index) => (
                                <React.Fragment key={usu.idUser}>
                                    <TableRow hover>
                                        <TableCell > {page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{usu.nombre} {usu.apellidoP}</TableCell>
                                        <TableCell>{usu.email}</TableCell>
                                        <TableCell>{usu.telefono}</TableCell>
                                        <TableCell><Chip label={capitalize(usu.rol.rol)} color="primary" /></TableCell>
                                        <TableCell><Chip label={usu.status ? "Activo" : "Inactivo"} color={usu.status ? "success" : "error"} /></TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => setOpenRow(openRow === usu.idUser ? null : usu.idUser)}>
                                                {openRow === usu.idUser ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openRow === usu.idUser} timeout="auto" unmountOnExit>
                                                <Box m={2} p={2} bgcolor="#f9fafb" borderRadius={2} boxShadow={1}>
                                                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" sx={{ mb: 2 }}>
                                                        <Typography variant="body1">
                                                            {usu.nombre} {usu.apellidoP} {usu.apellidoM}
                                                        </Typography>
                                                        <CloseIcon
                                                            onClick={() => setOpenRow(null)}
                                                            style={{ cursor: 'pointer', color: '#9CA3AF' }}
                                                        />
                                                    </Box>
                                                    <Grid container justifyContent="space-between" spacing={2}>
                                                        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
                                                            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                                    <Typography variant="caption" color="textSecondary">ID</Typography>
                                                                    <Typography variant="body2">{usu.idUser}</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                                    <Typography variant="caption" color="textSecondary">Email</Typography>
                                                                    <Typography variant="body2">{usu.email}</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                                    <Typography variant="caption" color="textSecondary">Telefono</Typography>
                                                                    <Typography variant="body2"> {usu.telefono}</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                                    <Typography variant="caption" color="textSecondary">Rol</Typography>
                                                                    <Typography variant="body2">{usu.rol.rol}</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                                    <Typography variant="caption" color="textSecondary">
                                                                        Estado
                                                                    </Typography>
                                                                    <Typography variant="body2">
                                                                        {usu.status ? "Activo" : "Inactivo"}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                        {/* Columna Derecha: Botones */}
                                                        <Grid  display="flex" flexDirection="column" justifyContent="flex-end">
                                                            <Box display="flex" justifyContent="flex-end" mt="auto">
                                                                <Box display="flex" gap={1}>
                                                                    <Button variant="contained" sx={{backgroundColor: '#333333'}} size="small" onClick={() => handleOpen(usu)}>
                                                                    Editar
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color={usu.status ? "error" : "success"}
                                                                        size="small"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                        }}
                                                                        onClick={() => {
                                                                            if (usu.status) {
                                                                                handleDelete(usu.idUser);
                                                                            } else {
                                                                                restaurarUsuarios(usu.idUser);
                                                                            }
                                                                        }}
                                                                        disabled={loading}
                                                                    >
                                                                        {loading && openRow === usu.idUser ? (
                                                                            <CircularProgress size={16} sx={{ color: 'white' }} />
                                                                        ) : (
                                                                            <Typography variant="button" sx={{ color: 'white' }}>
                                                                                {usu.status ? "Deshabilitar" : "Restaurar"}
                                                                            </Typography>
                                                                        )}
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedUsuarios.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </LayoutAdmin>
    );
};

export default Usuarios;
