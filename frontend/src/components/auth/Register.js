import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom'; // Import the Link component


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Access navigate function
  
    const handleSignup = () => {
      fetch('/api/auth/register', {
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
          console.log('User registered successfully!');
          navigate('/login');
        } else {
          console.error('Registration failed.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
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
        <button onClick={handleSignup}>Sign Up</button>
        <span>Already have an account? <Link to="/login">Login here</Link></span>
      </div>
    );
};

export default Signup;