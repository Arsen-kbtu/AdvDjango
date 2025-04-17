import React, { useState } from 'react';
import { createJob } from '../api';
import { useNavigate } from 'react-router-dom';

const JobCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    is_active: true,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'is_active' ? value === 'true' : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await createJob(formData);
      if (response.error) {
        setError(response.error);
        return;
      }
      setMessage(response.message || 'Job created successfully!');
      // setMessage('Job created successfully');
      setFormData({ title: '', company: '', description: '', location: '', is_active: true });
      // Optionally redirect after a delay:
      setTimeout(() => navigate('/jobs/manage'), 1500);
    } catch (err) {
      setError(err.error || 'Failed to create job');
    }
  };

  const handleCancel = () => {
    navigate('/jobs/manage');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '32px', 
          margin: 0,
          fontWeight: '600'
        }}>Create New Job</h1>
      </div>

      {(message || error) && (
        <div style={{ 
          padding: '12px 15px', 
          borderRadius: '5px', 
          marginBottom: '25px',
          backgroundColor: message ? '#e3f2fd' : '#ffebee',
          border: `1px solid ${message ? '#bbdefb' : '#ffcdd2'}`
        }}>
          {message && <p style={{ color: '#0d47a1', margin: '0' }}>{message}</p>}
          {error && <p style={{ color: '#c62828', margin: '0' }}>{error}</p>}
        </div>
      )}

      <div style={{ 
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        padding: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Senior Frontend Developer"
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
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="e.g. Acme Corporation"
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
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the role, requirements, and responsibilities..."
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '4px',
                border: '1px solid #dcdfe6',
                fontSize: '16px',
                minHeight: '150px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: '1.5'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York, NY"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '4px',
                border: '1px solid #dcdfe6',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#7f8c8d', marginTop: '5px', display: 'block' }}>
              Leave blank for fully remote positions without a specific location
            </small>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Job Status
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ 
                flex: 1,
                padding: '12px',
                border: `2px solid ${formData.is_active === true ? '#3498db' : '#dcdfe6'}`,
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: formData.is_active === true ? '#ebf5fb' : 'transparent',
                maxWidth: '200px'
              }}>
                <input
                  type="radio"
                  name="is_active"
                  value="true"
                  checked={formData.is_active === true}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '500' }}>Active</span>
              </label>
              <label style={{ 
                flex: 1,
                padding: '12px',
                border: `2px solid ${formData.is_active === false ? '#3498db' : '#dcdfe6'}`,
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: formData.is_active === false ? '#ebf5fb' : 'transparent',
                maxWidth: '200px'
              }}>
                <input
                  type="radio"
                  name="is_active"
                  value="false"
                  checked={formData.is_active === false}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '500' }}>Inactive</span>
              </label>
            </div>
            <small style={{ color: '#7f8c8d', marginTop: '5px', display: 'block' }}>
              Inactive jobs won't appear in search results but can be activated later
            </small>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
            <button 
              type="button" 
              onClick={handleCancel}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '15px'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{
                padding: '12px 24px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '15px'
              }}
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreate;