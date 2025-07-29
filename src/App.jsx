import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminHome from "./pages/home/ADMIN/AdminHome";
import UsuarioHome from "./pages/home/Usuario/UsuarioHome";
import ClienteHome from "./pages/home/CLIENT/ClienteHome";
import RutaProtegida from "./Components/RutaProtegida";
import Registro from "./pages/registro";
import Categorias from "./pages/home/ADMIN/Categorias";
import Servicios from "./pages/home/Usuario/Servicios";
import CrearServicio from "./pages/home/Usuario/CrearServicio";
import VerServicio from "./pages/home/CLIENT/VerReservacion";
import HacerReservacion from "./pages/home/CLIENT/HacerReservacion";
import Bitacora from "./pages/home/ADMIN/Bitacora";

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
          path="/categorias"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Categorias />
            </RutaProtegida>
          }
        />
        <Route
          path="/bitacora"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <Bitacora />
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
          path="/cliente"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <ClienteHome />
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
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
