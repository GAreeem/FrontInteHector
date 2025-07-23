import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminHome from "./pages/home/AdminHome";
import UsuarioHome from "./pages/home/UsuarioHome";
import ClienteHome from "./pages/home/ClienteHome";
import RutaProtegida from "./Components/RutaProtegida";
import Registro from "./pages/registro";

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
          path="/usuario"
          element={
            <RutaProtegida rolPermitido="USUARIO">
              <UsuarioHome />
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
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
