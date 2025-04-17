// src/components/MyResume.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResumeList } from '../api';

const MyResume = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeList();
        if (data.resumes && data.resumes.length > 0) {
          setResume(data.resumes[0]); // Latest resume
        }
      } catch (err) {
        setError('Failed to load resume');
      }
    };
    fetchResume();
  }, []);

  const handleUploadResume = () => {
    navigate('/upload-resume');
  };

  const handleRecommendations = () => {
    navigate('/jobs/recommendations');
  };

  const handleResumeFeedback = () => {
    navigate('/resume-feedback');
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
        }}>My Resume</h1>
        
        <button
          onClick={handleUploadResume}
          style={{
            padding: '10px 20px',
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
          <span>📄</span> Upload New Resume
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button
          onClick={handleResumeFeedback}
          style={{
            padding: '12px 20px',
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1'
          }}
        >
          <span>💬</span> Get Resume Feedback
        </button>
        <button
          onClick={handleRecommendations}
          style={{
            padding: '12px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1'
          }}
        >
          <span>🔍</span> View Job Recommendations
        </button>
      </div>
      
      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '5px',
          marginBottom: '20px',
          color: '#c62828'
        }}>
          <p style={{ margin: 0, fontWeight: '500' }}>{error}</p>
        </div>
      )}
      
      {!resume && !error && (
        <div style={{
          padding: '40px',
          backgroundColor: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📄</div>
          <h3 style={{ color: '#34495e', margin: '0 0 10px 0' }}>No Resume Found</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>You haven't uploaded your resume yet</p>
          <button 
            onClick={handleUploadResume}
            style={{
              padding: '10px 25px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px'
            }}
          >
            Upload Your First Resume
          </button>
        </div>
      )}
      
      {resume && (
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '25px',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h2 style={{ margin: '0', color: '#2c3e50', fontSize: '24px', fontWeight: '600' }}>
              {resume.title || 'My Resume'}
            </h2>
            <span style={{ 
              backgroundColor: '#e8f5e9', 
              padding: '5px 10px', 
              borderRadius: '20px', 
              fontSize: '13px',
              color: '#2e7d32',
              fontWeight: '500'
            }}>
              Latest Version
            </span>
          </div>
          
          <div style={{ 
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ 
                backgroundColor: '#e3f2fd', 
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                📄
              </span>
              <div>
                <div style={{ fontWeight: '500', color: '#34495e', fontSize: '16px' }}>
                  {resume.file_name || 'Resume Document'}
                </div>
                <div style={{ color: '#7f8c8d', fontSize: '14px' }}>
                  PDF Document
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: '#7f8c8d', width: '120px' }}>Uploaded:</span>
              <span style={{ fontWeight: '500', color: '#34495e' }}>
                {new Date(resume.uploaded_at).toLocaleString()}
              </span>
            </div>
            
            {resume.title && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#7f8c8d', width: '120px' }}>Title:</span>
                <span style={{ fontWeight: '500', color: '#34495e' }}>{resume.title}</span>
              </div>
            )}
            
            <div style={{ 
              marginTop: '10px',
              paddingTop: '20px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <a 
                href={resume.file} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>⬇️</span> Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResume;