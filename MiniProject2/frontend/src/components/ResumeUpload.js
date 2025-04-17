import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../api';

const ResumeUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    file: null,
  });
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] }); // Handle file input
      setFileName(files[0] ? files[0].name : '');
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!formData.file) {
      setError('Please select a resume file to upload');
      return;
    }
    
    const data = new FormData();
    data.append('file', formData.file); // Required field
    if (formData.title) data.append('title', formData.title); // Optional field

    try {
      await uploadResume(data);
      setMessage('Resume uploaded successfully');
      setTimeout(() => navigate('/my-resume'), 1500); // Redirect after success
    } catch (err) {
      setError(err.error || 'Failed to upload resume');
    }
  };

  const handleCancel = () => {
    navigate('/my-resume');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
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
        }}>Upload Resume</h1>
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Resume Title (Optional)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Software Engineer 2023"
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
              Give your resume a meaningful title to help you identify it later
            </small>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#34495e' }}>
              Resume File *
            </label>
            
            <div style={{ 
              border: '2px dashed #3498db',
              borderRadius: '4px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#ebf5fb',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                required
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📄</div>
              <p style={{ margin: '0 0 10px 0', fontWeight: '500', color: '#2c3e50' }}>
                {fileName ? fileName : "Click to select or drag & drop your resume file"}
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>
                Supported formats: PDF, DOCX, DOC (Max: 5MB)
              </p>
            </div>
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
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📤</span> Upload Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;