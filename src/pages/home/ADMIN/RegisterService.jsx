import { useState } from "react";
import { Box, Button, IconButton, Paper, Typography, Grid, Avatar } from "@mui/material";
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import LayoutAdmin from "./LayoutAdmin";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { useNavigate } from "react-router-dom";

const RegisterService = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setImages([]);
  };

  return (
    <LayoutAdmin>
          
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" position='relative'>
        <IconButton
          sx={{position: 'absolute' ,top: 0, left: 20, bgcolor: 'white', boxShadow: 1 }}
          onClick={() => navigate('/servicios')}
        >
          <ArrowBackIcon />
        </IconButton>
        <Paper sx={{ pr: 4, pl:4, pb:4, width: '100%', maxWidth: 800, borderRadius: 4, textAlign: 'center' }}>
             <Typography variant="h5" p={3}>
            Crear servicio
        </Typography>
         <Box sx={{ pl: 2, pr:2 }}>
  <Box mb={2}>
    <TextField
      required
      label="Nombre del servicio"
      fullWidth
      inputProps={{ maxLength: 30}}
    />
  </Box>
  <Box mb={2}>
    <TextField
      label="Descripción del servicio"
      multiline
      rows={4}
      fullWidth
      required
    inputProps={{ maxLength: 60 }}
    />
  </Box>
</Box>
          <Typography variant="h6" textAlign={'start'} mb={2}>Images</Typography>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 4,
              p: 4,
              mb: 3,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => document.getElementById('image-upload').click()}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <CropOriginalIcon  sx={{fontSize: 40}}/>
            <Typography variant="body1">Selecciona las imagenes</Typography>
            <Typography variant="body2" color="textSecondary">
              Subir al menos 1 imagen y maximas 5
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {images.map((img, index) => (
              <Grid item key={index}>
                <Box position="relative">
                  <Avatar
                    src={img.preview}
                    variant="rounded"
                    sx={{ width: 80, height: 80, borderRadius: 2 }}
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
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          {images.length > 0 && (
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="primary" size="medium" onClick={handleRemoveAll} sx={{textTransform: 'none', fontWeight: 'bold', color: 'black'}}>Quitar todo</Button>
              <Button variant="outlined" color="primary" size="medium"  sx={{textTransform: 'none', fontWeight: 'bold', color: 'white', bgcolor: 'black'}}>Registrar</Button>
            </Box>
          )}

        </Paper>
      </Box>
    </LayoutAdmin>
  );
}

export default RegisterService;
