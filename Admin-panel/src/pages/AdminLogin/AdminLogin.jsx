import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import {url} from '../../assets/files/files'

const AdminLogin = () => {
  const { setToken } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("adminToken", res.data.token);
        navigate('/orders');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.error('Backend error:', err.response.data);
        alert(err.response.data.message || "Login failed.");
      } else {
        console.error(err);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
