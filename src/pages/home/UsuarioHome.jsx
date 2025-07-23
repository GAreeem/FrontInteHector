import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UsuarioHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // redirige si no hay token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido a la pantalla de inicio USUARIO</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default UsuarioHome;
