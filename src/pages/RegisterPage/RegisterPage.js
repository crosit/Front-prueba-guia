import {React, useState} from "react";
import api from "../../utils/api";
import './RegisterPage.css';
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client'); // Valor por defecto
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const notify = (message) => toast.success(message);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!['admin', 'user', 'client'].includes(role)) {
      setError('Invalid role selected.');
      return;
    }

    try {
      await api.post('/auth/register', { email, password, name, role });
      notify('User registered successfully. Redirecting to login page...');
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (err) {
      setError('Error registering user.');
      console.error(err);
    }
  };

  return (
    <div>
    <div className="register-form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="client">Client</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;