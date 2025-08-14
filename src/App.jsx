import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminHome from "./pages/home/ADMIN/AdminHome";
import RutaProtegida from "./Components/RutaProtegida";
import Registro from "./pages/registro";
import Categorias from "./pages/home/ADMIN/Categorias";

import "./index.css"; 
import Usuarios from "./pages/home/ADMIN/Usuarios";
import RegisterEmployee from "./pages/home/ADMIN/registerEmployee";
import ServiciosAdmin from "./pages/home/ADMIN/Servicios";
import RegisterService from "./pages/home/ADMIN/RegisterService";
import MisReservaciones from "./pages/home/CLIENT/MisReservaciones";
import ServiciosUsuario from "./pages/home/Usuario/Servicios";
import CrearServicio from "./pages/home/Usuario/CrearServicio";
import VerServicio from "./pages/home/CLIENT/VerReservacion";
import HacerReservacion from "./pages/home/CLIENT/HacerReservacion";
import Bitacora from "./pages/home/ADMIN/Bitacora";
import ServiciosInactivos from "./pages/home/ADMIN/ServiciosInactivos";
import PerfilUsuario from "./pages/home/ADMIN/Perfil";
import ClienteHome from "./pages/home/CLIENT/ClienteHome";
import EditService from "./pages/home/ADMIN/editService";
import UsuarioHome from "./pages/home/Usuario/UsuarioHome";
import Servicios from "./pages/home/Usuario/Servicios";
import Perfil from "./pages/home/Usuario/Perfil";
import PerfilCliente from "./pages/home/CLIENT/Perfil";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* RUTAS ADMIN */}
        <Route path="/admin">
          <Route path="inicio" element={<RutaProtegida rolPermitido="ADMIN"><AdminHome /></RutaProtegida>} />
          <Route path="usuarios" element={<RutaProtegida rolPermitido="ADMIN"><Usuarios /></RutaProtegida>} />
          <Route path="categorias" element={<RutaProtegida rolPermitido="ADMIN"><Categorias /></RutaProtegida>} />
          <Route path="servicios" element={<RutaProtegida rolPermitido="ADMIN"><ServiciosAdmin /></RutaProtegida>} />
          <Route path="editar-servicio/:idServicio" element={<RutaProtegida rolPermitido="ADMIN"><EditService /></RutaProtegida>} />
          <Route path="servicio/editar" element={<RutaProtegida rolPermitido="ADMIN"><ServiciosInactivos /></RutaProtegida>} />
          <Route path="bitacora" element={<RutaProtegida rolPermitido="ADMIN"><Bitacora /></RutaProtegida>} />
          <Route path="registro-empleado" element={<RutaProtegida rolPermitido="ADMIN"><RegisterEmployee /></RutaProtegida>} />
          <Route path="registro-servicio" element={<RutaProtegida rolPermitido="ADMIN"><RegisterService /></RutaProtegida>} />
          <Route path="perfil" element={<RutaProtegida rolPermitido="ADMIN"><PerfilUsuario /></RutaProtegida>} />
        </Route>

        <Route
          path="/servicios"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <ServiciosUsuario />
            </RutaProtegida>
          }
        />
        <Route
          path="/crear-servicio/:idCategoria"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <CrearServicio />
            </RutaProtegida>
          }
        />
       <Route
          path="/usuario"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <UsuarioHome />
            </RutaProtegida>
          }
        />
        <Route
          path="/servicios"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <Servicios />
            </RutaProtegida>
          }
        />
        <Route
          path="/crear-servicio/:idCategoria"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <CrearServicio />
            </RutaProtegida>
          }
        />

         <Route
          path="/perfil"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <Perfil />
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
          path="/ver-servicio/:idCategoria"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <VerServicio />
            </RutaProtegida>
          }
        />
        <Route
          path="/reservar/:idServicio"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <HacerReservacion />
            </RutaProtegida>
          }
        />
        <Route
          path="/mis-reservaciones"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <MisReservaciones />
            </RutaProtegida>
          }
        />
        <Route
          path="/cliente"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <ClienteHome />
            </RutaProtegida>
          }
        />
         <Route
          path="/perfil-cliente"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <PerfilCliente />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
