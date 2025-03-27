import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const QueryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    question: '',
    category: 'General'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'General',
    'Academic',
    'Administrative',
    'Technical',
    'Financial'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      navigate('/success'); // Redirect after successful submission
    } catch (err) {
      setError(err.message || 'Failed to submit query');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="query-form-container">
      <h2>Submit New Query</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="query-form">
        <div className="form-group">
          <label htmlFor="studentName">Your Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="question">Your Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={500}
            rows={5}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Query'}
        </button>
      </form>
    </div>
  );
};

QueryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default QueryForm;