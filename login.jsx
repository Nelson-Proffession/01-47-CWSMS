import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage('Username and Password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        withCredentials: true, // Include session cookies
      });

      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.data)); // Store user session
        navigate('/view'); // Redirect to the view page
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password');
      } else {
        console.error('Error logging in:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Login;