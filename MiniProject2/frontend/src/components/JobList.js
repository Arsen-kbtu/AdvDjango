import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getJobList, logoutUser} from '../api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobList();
        setJobs(data.jobs);
      } catch (err) {
        setError('Failed to load jobs');
      }
    };
    fetchJobs();
  }, []);

  const handleManageJobs = () => {
    navigate('/jobs/manage');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleMyResumes = () => {
    navigate('/my-resume');
  };

  const handlePasswordReset = () => {
    navigate('/password-reset');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
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
        }}>Job Listings</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
          >
            Logout
          </button>
          <button
            onClick={handlePasswordReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '15px',
        marginBottom: '25px'
      }}>
        <button
          onClick={handleManageJobs}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📋</span> Manage My Jobs
        </button>
        <button
          onClick={handleMyResumes}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📄</span> My Resumes
        </button>
      </div>
      
      {error && (
        <div style={{
          padding: '10px 15px',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#c62828'
        }}>
          {error}
        </div>
      )}
      
      {jobs.length === 0 && !error && (
        <div style={{
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <p style={{ color: '#7f8c8d', fontSize: '16px' }}>No jobs available at the moment</p>
        </div>
      )}
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {jobs.map((job) => (
          <div 
            key={job.id} 
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '20px' }}>{job.title}</h3>
              <span style={{ 
                backgroundColor: '#e8f5e9', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                color: '#2e7d32',
                fontWeight: '500'
              }}>
                {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#7f8c8d' }}>🏢</span>
                <span style={{ fontWeight: '500', color: '#34495e' }}>{job.company}</span>
              </div>
              {job.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: '#7f8c8d' }}>📍</span>
                  <span style={{ color: '#34495e' }}>{job.location}</span>
                </div>
              )}
            </div>
            
            <p style={{ 
              margin: '15px 0', 
              color: '#555',
              lineHeight: '1.6',
              borderLeft: '3px solid #3498db',
              paddingLeft: '12px'
            }}>
              {job.description}
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#7f8c8d', fontSize: '14px' }}>Posted by:</span>
                <span style={{ fontWeight: '500', color: '#34495e', fontSize: '14px' }}>{job.posted_by}</span>
              </div>
              
              <button 
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;