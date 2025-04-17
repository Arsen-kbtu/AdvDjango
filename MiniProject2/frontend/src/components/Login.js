// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await loginUser(formData);
      if (response.error) {
        setError(response.error);
        return;
      }
      setMessage(response.message || 'Login successful!');
      // setMessage('Login successful!');
      // Redirect to /jobs after successful login
      setTimeout(() => navigate('/jobs'), 1000); // Optional delay for message visibility
    } catch (err) {
      setError(err.error || 'Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container" style={{ 
      maxWidth: '450px', 
      margin: '80px auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      padding: '35px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', fontSize: '28px', margin: 0 }}>Welcome Back</h2>
        <p style={{ color: '#7f8c8d', marginTop: '8px' }}>Sign in to continue to your account</p>
      </div>

      {(message || error) && (
        <div style={{ 
          padding: '12px 15px', 
          borderRadius: '5px', 
          marginBottom: '20px',
          backgroundColor: message ? '#e3f2fd' : '#ffebee',
          border: `1px solid ${message ? '#bbdefb' : '#ffcdd2'}`
        }}>
          {message && <p style={{ color: '#0d47a1', margin: '0' }}>{message}</p>}
          {error && <p style={{ color: '#c62828', margin: '0' }}>{error}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px',
              border: '1px solid #dcdfe6',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px',
              border: '1px solid #dcdfe6',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '100%',
            padding: '14px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Sign In
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Don't have an account yet?</p>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            style={{ 
              backgroundColor: 'transparent',
              border: '1px solid #3498db',
              color: '#3498db',
              padding: '8px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;