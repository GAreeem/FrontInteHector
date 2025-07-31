import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/registro.css'; // Importamos el CSS

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    email: '',
    telefono: '',
    password: '',
    edad: '',
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
    <div className="registro-container">
      <div className="registro-card">
        <h1 className="registro-title">Resvy</h1>
        <h2 className="registro-subtitle">Crear cuenta</h2>
        
        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label className="form-label">Nombre*</label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              className="form-input"
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Apellido Paterno*</label>
              <input 
                type="text" 
                name="apellidoP" 
                value={formData.apellidoP} 
                onChange={handleChange} 
                className="form-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Apellido Materno</label>
              <input 
                type="text" 
                name="apellidoM" 
                value={formData.apellidoM} 
                onChange={handleChange} 
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email*</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-input"
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Teléfono*</label>
              <input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                className="form-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Edad*</label>
              <input 
                type="number" 
                name="edad" 
                value={formData.edad} 
                onChange={handleChange} 
                className="form-input"
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Contraseña*</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="form-input"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Rol*</label>
            <select 
              name="idRol" 
              value={formData.idRol} 
              onChange={handleChange}
              className="form-select"
            >
              <option value={2}>USUARIO</option>
              <option value={3}>CLIENTE</option>
            </select>
          </div>
          
          <button type="submit" className="registro-button">Registrarme gratis</button>
          
          <div className="login-link">
            ¿Ya tienes una cuenta? <span onClick={() => navigate('/')}>Iniciar sesión</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;