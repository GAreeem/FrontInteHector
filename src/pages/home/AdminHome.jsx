import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
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
      <h1>Bienvenido a la pantalla de inicio ADMIN</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default AdminHome;
