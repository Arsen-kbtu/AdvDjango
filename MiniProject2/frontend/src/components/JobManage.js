// src/components/JobManage.jsx
import React, { useState, useEffect } from 'react';
import { getJobList, updateJob, deleteJob } from '../api';
import { useNavigate } from "react-router-dom";

const JobManage = () => {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const username = user.username;
        if (!username) {
          throw new Error('No username found in localStorage');
        }
        const data = await getJobList();
        const filteredJobs = data.jobs.filter(job => job.posted_by === username);
        setJobs(filteredJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to load jobs');
      }
    };
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditJob({ ...job });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedJob = await updateJob(editJob.id, editJob);
      setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
      setEditJob(null);
    } catch (err) {
      setError('Failed to update job');
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (err) {
        setError('Failed to delete job');
      }
    }
  };

  const handleCreateJob = () => {
    navigate('/jobs/create');
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
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
        }}>Manage Your Jobs</h1>
        
        <button
          onClick={handleCreateJob}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2ecc71',
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
          <span>➕</span> Create New Job
        </button>
      </div>
      
      {error && (
        <div style={{
          padding: '12px 15px',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '5px',
          marginBottom: '25px',
          color: '#c62828'
        }}>
          {error}
        </div>
      )}
      
      {jobs.length === 0 && !error && (
        <div style={{
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '30px',
          border: '1px dashed #dee2e6'
        }}>
          <p style={{ color: '#7f8c8d', fontSize: '16px', margin: 0 }}>You haven't posted any jobs yet</p>
          <button
            onClick={handleCreateJob}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Post Your First Job
          </button>
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {jobs.map((job) => (
          <div 
            key={job.id} 
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            {editJob && editJob.id === job.id ? (
              <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={editJob.title}
                    onChange={(e) => setEditJob({...editJob, title: e.target.value})}
                    required
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
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={editJob.company}
                    onChange={(e) => setEditJob({...editJob, company: e.target.value})}
                    required
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
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editJob.location}
                    onChange={(e) => setEditJob({...editJob, location: e.target.value})}
                    placeholder="Remote, City, or Country"
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
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
                    Description
                  </label>
                  <textarea
                    value={editJob.description}
                    onChange={(e) => setEditJob({...editJob, description: e.target.value})}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      borderRadius: '4px',
                      border: '1px solid #dcdfe6',
                      fontSize: '16px',
                      minHeight: '120px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#34495e' }}>
                    Status
                  </label>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <label style={{ 
                      flex: 1,
                      padding: '12px',
                      border: `2px solid ${editJob.is_active ? '#3498db' : '#dcdfe6'}`,
                      borderRadius: '4px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: editJob.is_active ? '#ebf5fb' : 'transparent',
                      maxWidth: '200px'
                    }}>
                      <input
                        type="radio"
                        value="true"
                        checked={editJob.is_active === true}
                        onChange={() => setEditJob({...editJob, is_active: true})}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontWeight: '500' }}>Active</span>
                    </label>
                    <label style={{ 
                      flex: 1,
                      padding: '12px',
                      border: `2px solid ${!editJob.is_active ? '#3498db' : '#dcdfe6'}`,
                      borderRadius: '4px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: !editJob.is_active ? '#ebf5fb' : 'transparent',
                      maxWidth: '200px'
                    }}>
                      <input
                        type="radio"
                        value="false"
                        checked={editJob.is_active === false}
                        onChange={() => setEditJob({...editJob, is_active: false})}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontWeight: '500' }}>Inactive</span>
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={() => setEditJob(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h2 style={{ margin: '0 0 15px 0', color: '#2c3e50', fontSize: '22px' }}>
                    {job.title}
                    <span style={{ 
                      display: 'inline-block',
                      marginLeft: '10px',
                      padding: '4px 8px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'normal',
                      backgroundColor: job.is_active ? '#e8f5e9' : '#ffebee',
                      color: job.is_active ? '#2e7d32' : '#c62828',
                    }}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </h2>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
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
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <button 
                    onClick={() => handleDelete(job.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ffebee',
                      color: '#c62828',
                      border: '1px solid #ffcdd2',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => handleEdit(job)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    Edit Job
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobManage;