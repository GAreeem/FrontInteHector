import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminHome from "./pages/home/ADMIN/AdminHome";
import UsuarioHome from "./pages/home/UsuarioHome";
import ClienteHome from "./pages/home/ClienteHome";
import RutaProtegida from "./Components/RutaProtegida";
import Registro from "./pages/registro";
import Categorias from "./pages/home/ADMIN/Categorias";
import "./index.css"; 
import Usuarios from "./pages/home/ADMIN/Usuarios";
import RegisterEmployee from "./pages/home/ADMIN/registerEmployee";
import Servicios from "./pages/home/ADMIN/Servicios";
import RegisterService from "./pages/home/ADMIN/RegisterService";
import Historial from "./pages/home/ADMIN/Historial";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/inicio"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <AdminHome />
            </RutaProtegida>
          }
        />
         <Route
          path="/usuarios"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Usuarios />
            </RutaProtegida>
          }
        />
        <Route
          path="/categorias"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Categorias />
            </RutaProtegida>
          }
        />
         <Route
          path="/servicios"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Servicios />
            </RutaProtegida>
          }
        />
        <Route
          path="/registro-empleado"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <RegisterEmployee />
            </RutaProtegida>
          }
        />
        <Route
          path="/registro-servicio"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <RegisterService />
            </RutaProtegida>
          }
        />
         <Route
          path="/bitacora"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Historial />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
