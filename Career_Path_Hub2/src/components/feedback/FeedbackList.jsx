import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackItem from './FeedbackItem';

const FeedbackList = ({ isAdmin = false, companyId = null }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minRating: 0,
    search: ''
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let url = '/api/feedback';
        if (companyId && !isAdmin) {
          url = `/api/feedback/company/${companyId}`;
        }
        
        const response = await axios.get(url, {
          params: {
            category: filters.category || undefined,
            minRating: filters.minRating || undefined,
            search: filters.search || undefined
          }
        });
        
        setFeedbacks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, [isAdmin, companyId, filters]);

  if (isLoading) return <div>Loading feedback...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feedback-list">
      <div className="feedback-filters mb-4">
        <h4>Filters</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              <option value="general">General</option>
              <option value="bug">Bug Report</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filters.minRating}
              onChange={(e) => setFilters({...filters, minRating: parseInt(e.target.value)})}
            >
              <option value="0">Any Rating</option>
              <option value="1">1+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search feedback..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className="alert alert-info">No feedback found</div>
      ) : (
        <div className="feedback-items">
          {feedbacks.map((feedback) => (
            <FeedbackItem 
              key={feedback.id} 
              feedback={feedback} 
              isAdmin={isAdmin} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;