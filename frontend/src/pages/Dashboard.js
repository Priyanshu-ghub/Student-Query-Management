import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QueryForm from '../components/QueryForm';
import QueryList from '../components/QueryList';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import '../styles/Dashboard.css';

// Base API URL configuration
const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch queries from backend
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/queries`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setQueries(data);
        setFilteredQueries(data);
      } catch (err) {
        setError('Failed to fetch queries. Please try again later.');
        console.error('Error fetching queries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Apply search and filter
  useEffect(() => {
    let results = queries;
    
    if (searchTerm) {
      results = results.filter(query => 
        query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      results = results.filter(query => query.status === statusFilter);
    }

    setFilteredQueries(results);
  }, [searchTerm, statusFilter, queries]);

  const handleSubmitQuery = async (formData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/queries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      const data = await response.json();
      setQueries(prev => [data, ...prev]);
      setSuccessMessage('Query submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit query');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/queries/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Deletion failed');
      
      setQueries(prev => prev.filter(query => query._id !== id));
      setSuccessMessage('Query deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete query');
    }
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student Query Dashboard</h1>
        <button 
          className="logout-btn"
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}

      <div className="controls-section">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <StatusFilter 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
      </div>

      <div className="dashboard-content">
        <div className="query-form-section">
          <h2>Submit New Query</h2>
          <QueryForm onSubmit={handleSubmitQuery} />
        </div>

        <div className="query-list-section">
          <h2>
            {statusFilter === 'All' ? 'All' : statusFilter} Queries 
            <span className="count-badge">{filteredQueries.length}</span>
          </h2>
          <QueryList 
            queries={filteredQueries} 
            onDelete={handleDeleteQuery} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;