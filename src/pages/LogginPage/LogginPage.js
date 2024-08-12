// src/pages/LoginPage/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; 
import './LogginPage.css';

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const response = await api.post('/auth/login', { email, password });
        
        const token = response.data.token;
        
        // Save token in local storage
        localStorage.setItem('token', token);
  
        // Redirect to home page
        navigate('/home');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        
      }
    };
  
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Iniciar sesión</button>
        <p> don't you have acount? <a href = "/register">Register</a></p>
      </form>
    );
  };

export default LoginPage;
