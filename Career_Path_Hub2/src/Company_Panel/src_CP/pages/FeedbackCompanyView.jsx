import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/styles/feedback.css';
import axios from 'axios';

const FeedbackCompanyView = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [allFeedback, setAllFeedback] = useState([]);
  const [companies, setCompanies] = useState([]); // New state for companies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const fetchAllFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const [feedbackResponse, companiesResponse] = await Promise.all([
        axios.get(`https://localhost:5000/GetFeedbackByID?ID=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        axios.get('https://localhost:5000/GetALlCompany')
      ]);
      setAllFeedback(feedbackResponse.data);
      setCompanies(companiesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllFeedback();
    } else {
      setError('Authentication token not found');
      setLoading(false);
    }
  }, [token]);

  // Function to get company name by ID
  const getCompanyName = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.userName : 'General';
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      setDeleteLoading(prev => ({ ...prev, [feedbackId]: true }));
      await axios.delete(`https://localhost:5000/DeleteFeedback?ID=${feedbackId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchAllFeedback();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete feedback');
      console.error('Error deleting feedback:', err);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [feedbackId]: false }));
    }
  };

  return (
    <div className="feedback-admin-container">
      <div className="feedback-header">
        <h2>Feedback Company</h2>
      </div>

      {loading ? (
        <div className="loading">Loading feedback...</div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchAllFeedback}>Retry</button>
        </div>
      ) : allFeedback.length === 0 ? (
        <div className="empty-state">
          <p>No feedback found</p>
        </div>
      ) : (
        <div className="feedback-grid">
          {allFeedback.map(feedback => (
            <div key={feedback.id} className="feedback-card">
              <div className="card-header">
                {/* Changed to display company name instead of ID */}
                <h4>{getCompanyName(feedback.companyId)}</h4>
                <span className="rating">{feedback.rating}/5</span>
              </div>
              <div className="card-body">
                <p className="user">{feedback.title || 'Anonymous'}</p>
                <p className="comment">
                  {feedback.message || 'No comment provided'}
                </p>
                <p className="date">
                  {new Date(feedback.createdDate).toLocaleDateString()}
                </p>
              </div>
              <div className="card-actions">
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackCompanyView;