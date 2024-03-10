import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse response JSON data
      }
      throw new Error('Login failed.');
    })
    .then(data => {
      // Save user and token data to local storage upon successful login
      localStorage.setItem('user', data.user);
      localStorage.setItem('token', data.token);
      
      // Redirect to home page or perform any desired action upon successful login
      console.log('User logged in successfully!');
      navigate('/'); // Redirect to the home page
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error cases, display an error message to the user, etc.
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <span>New student? <Link to="/register">Register here</Link></span>
    </div>
  );
};

export default Login;
