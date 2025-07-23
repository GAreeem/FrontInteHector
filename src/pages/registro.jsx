import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  email: '',
  telefono: '',
  password: '',
  idRol: 2 
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/usuarios/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Usuario registrado correctamente. Redirigiendo al login...');
        navigate('/');
      } else {
        const error = await response.text();
        alert('Error al registrar: ' + error);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en la solicitud');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registrar Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div></div>
        <div>
          <label>Apellido Paterno:</label><br />
          <input type="text" name="apellidoP" value={formData.apellidoP} onChange={handleChange} required />
        </div>
        <div>  
            <label>Apellido Materno:</label><br />
            <input type="text" name="apellidoM" value={formData.apellidoM} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        <div>
          <label>Contraseña:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Edad:</label><br />
          <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label><br />
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div>
        <label>Rol:</label><br />
        <select name="idRol" value={formData.idRol} onChange={handleChange}>
        <option value={2}>USUARIO</option>
        <option value={3}>CLIENTE</option>
        </select>
        </div>
        <br />
        <button type="submit">Registrar</button>
        <br /><br />
        <button type="button" onClick={() => navigate('/')}>Volver al Login</button>
      </form>
    </div>
  );
};

export default Registro;
