import { useState, useEffect } from "react";
import LayoutAdmin from "./LayoutAdmin";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Historial = () => {
     const [bitacora, setBitacora] = useState([]);
     const [loading, setLoading] = useState(false);
     const token = localStorage.getItem("token");

     const fetchHistorial = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/bitacora/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data && data.result) {
                setBitacora(data.result);
                console.log(data)
            } else {
                setBitacora([]);
                console.log("MAL")
            }
        } catch (err) {
            console.error("Error al obtener bitacora:", err);
        }finally {
            setLoading(false);
    }
    };

    const limpiarBitacora = async () => {
    try {
      const response = await fetch("http://localhost:8080/bitacora/limpiar", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al limpiar la bitácora");
      fetchHistorial(); 
    } catch (error) {
      console.error(error);
    }
  };

      useEffect(() => {
        fetchHistorial();
      }, []);
      
    return (
        <LayoutAdmin >
             <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Bitácora</Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={limpiarBitacora}
        >
          Limpiar Bitácora
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Endpoint</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bitacora.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell></TableCell>
                  <TableCell>{registro.usuario}</TableCell>
                  <TableCell>{registro.metodoHttp}</TableCell>
                  <TableCell>{registro.endpoint}</TableCell>
                  <TableCell>{registro.descripcion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
        </LayoutAdmin>
    )
};

export default Historial