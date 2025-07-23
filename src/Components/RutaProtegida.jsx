import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, rolPermitido }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token || rol !== rolPermitido) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutaProtegida;
