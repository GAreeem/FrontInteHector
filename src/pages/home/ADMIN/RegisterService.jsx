import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Paper, Typography, Grid, Avatar, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import LayoutAdmin from "./LayoutAdmin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterService = () => {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    setIdCategoria(event.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImage = {
      file: files[0],
      preview: URL.createObjectURL(files[0])
    };

    setImage(newImage);  // Solo permite una imagen
  };

  const handleRemoveImage = () => {
    setImage(null);
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
      } else {
        setCategorias([]);
      }
    } catch (err) {
      console.error("Error al obtener categorías:", err);
      setCategorias([]);
    }
  };

 const handleSubmit = async () => {
  if (!nombre || !descripcion || !precio || !idCategoria || !image) {
    alert("Completa todos los campos y sube una imagen");
    return;
  }

  const formData = new FormData();

  // Convertimos el objeto datos a Blob con tipo application/json
  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    precio: parseFloat(precio),
    idCategoria: parseInt(idCategoria),
  };

  formData.append(
    "datos",
    new Blob([JSON.stringify(datos)], { type: "application/json" })
  );
  formData.append("imagen", image.file);

  try {
    const response = await fetch("http://localhost:8080/servicio/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,  // Solo pon los headers que sí son necesarios
        // No pongas 'Content-Type' aquí
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      alert("Servicio registrado correctamente");
      navigate("/admin/servicios");
    } else {
      const error = await response.json();
      console.error(error);
      alert("Error al registrar el servicio");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  }
};

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" position='relative'>
        <IconButton
          sx={{ position: 'absolute', top: 0, left: 20, bgcolor: 'white', boxShadow: 1 }}
          onClick={() => navigate('/admin/servicios')}
        >
          <ArrowBackIcon />
        </IconButton>
        <Paper sx={{ pr: 4, pl: 4, pb: 4, width: '100%', maxWidth: 800, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" p={3}>
            Crear servicio
          </Typography>
          <Box sx={{ pl: 2, pr: 2 }}>
            <Box mb={2}>
              <TextField
                required
                label="Nombre del servicio"
                fullWidth
                inputProps={{ maxLength: 100 }}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Descripción del servicio"
                multiline
                rows={4}
                fullWidth
                required
                inputProps={{ maxLength: 200 }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                required
                label="Precio"
                fullWidth
                type="number"
                inputProps={{ step: "0.01" }}
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth required>
                <InputLabel id="categoria-select-label">Categoría</InputLabel>
                <Select
                  labelId="categoria-select-label"
                  id="categoria-select"
                  value={idCategoria}
                  label="Categoría"
                  onChange={handleChange}
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat.idCategoriaServicio} value={cat.idCategoriaServicio}>
                      {cat.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Typography variant="h6" textAlign={'start'} mb={2}>Imagen</Typography>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 4,
              p: 4,
              mb: 3,
              cursor: 'pointer',
              position: 'relative',
              textAlign: 'center'
            }}
            onClick={() => document.getElementById('image-upload').click()}
          >
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              multiple={false}
            />
            {image ? (
              <Box position="relative" display="inline-block">
                <Avatar
                  src={image.preview}
                  variant="rounded"
                  sx={{ width: 200, height: 200, borderRadius: 2 }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: 'white',
                    boxShadow: 1
                  }}
                  onClick={(e) => {
                    e.stopPropagation();  // Evita que abra el input file al dar click en la X
                    handleRemoveImage();
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <>
                <CropOriginalIcon sx={{ fontSize: 40 }} />
                <Typography variant="body1">Selecciona una imagen</Typography>
                <Typography variant="body2" color="textSecondary">
                  Sube 1 imagen
                </Typography>
              </>
            )}
          </Box>

          {image && (
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                size="medium"
                sx={{ textTransform: 'none', fontWeight: 'bold', color: 'white', bgcolor: 'black' }}
                onClick={handleSubmit}
              >
                Registrar
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
      </motion.div>
    </LayoutAdmin>
  );
}

export default RegisterService;
