// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'job_seeker',
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
      const response = await registerUser(formData);
      setMessage(`${response.message} Registered as ${response.role}.`);
    } catch (err) {
      setError(err.error || 'Registration failed. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container" style={{ 
      maxWidth: '500px', 
      margin: '60px auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '30px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#2c3e50', fontSize: '28px', margin: 0 }}>Create an Account</h2>
        <p style={{ color: '#7f8c8d', marginTop: '8px' }}>Join our platform to find your dream job or perfect candidate</p>
      </div>

      {(message || error) && (
        <div style={{ 
          padding: '10px 15px', 
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '4px',
                border: '1px solid #dcdfe6',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '4px',
                border: '1px solid #dcdfe6',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Minimum 6 characters"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '4px',
                border: '1px solid #dcdfe6',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
              I want to join as:
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ 
                flex: 1,
                padding: '12px',
                border: `2px solid ${formData.role === 'job_seeker' ? '#3498db' : '#dcdfe6'}`,
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: formData.role === 'job_seeker' ? '#ebf5fb' : 'transparent',
              }}>
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={formData.role === 'job_seeker'}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '500' }}>Job Seeker</span>
              </label>
              <label style={{ 
                flex: 1,
                padding: '12px',
                border: `2px solid ${formData.role === 'recruiter' ? '#3498db' : '#dcdfe6'}`,
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: formData.role === 'recruiter' ? '#ebf5fb' : 'transparent',
              }}>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={formData.role === 'recruiter'}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '500' }}>Recruiter</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button 
            type="submit"
            style={{ 
              width: '100%',
              padding: '12px',
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
            Create Account
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Already have an account?</p>
            <button
              type="button"
              onClick={handleLoginRedirect}
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
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;