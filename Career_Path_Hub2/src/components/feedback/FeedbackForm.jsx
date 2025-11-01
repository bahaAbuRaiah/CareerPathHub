import React, { useState, useEffect } from 'react';
import "../styles/feedback.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    Title: '',
    Message: '',
    rating: 5,
    CompanyId: '' // Made optional
  });

  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [success, setSuccess] = useState(false);

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://localhost:5000/GetALlCompany', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          throw new Error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Title.trim()) newErrors.Title = 'Title is required';
    if (formData.Title.length > 100) newErrors.Title = 'Title too long (max 100 chars)';
    if (!formData.Message.trim()) newErrors.Message = 'Message is required';
    if (formData.Message.length > 1000) newErrors.Message = 'Message too long (max 1000 chars)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://localhost:5000/AddFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({
          Title: '',
          Message: '',
          rating: 5,
          CompanyId: ''
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.Message || 'Failed to submit feedback' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleratingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 font-['Inter'] py-8 animate-fade-in">
      <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-blue-100 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center tracking-tight">We Value Your Feedback</h2>
        <p className="text-gray-500 mb-6 text-center">Help us improve by sharing your thoughts below.</p>
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-center font-medium animate-fade-in">
            Thank you for your feedback!
          </div>
        )}
        {errors.submit && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-center font-medium animate-fade-in">
            {errors.submit}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="Title" className="block text-sm font-semibold text-gray-700 mb-1">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              maxLength={100}
              placeholder="Brief summary of your feedback"
              required
              className={`w-full px-4 py-3 rounded-xl border-2 focus:border-indigo-400 transition-all bg-white/80 shadow-sm text-gray-800 ${errors.Title ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.Title && <span className="text-xs text-red-500 mt-1 block">{errors.Title}</span>}
          </div>

          <div>
            <label htmlFor="CompanyId" className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
            {isLoadingCompanies ? (
              <div className="text-gray-400 text-sm">Loading companies...</div>
            ) : (
              <select
                id="CompanyId"
                name="CompanyId"
                value={formData.CompanyId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 transition-all bg-white/80 shadow-sm text-gray-800"
              >
                <option value="">Select a company (optional)</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.userName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-2xl transition-colors duration-200 focus:outline-none ${star <= formData.rating ? 'text-yellow-400 scale-110' : 'text-gray-300'} hover:scale-125`}
                  onClick={() => handleratingChange(star)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">{formData.rating} out of 5</span>
            </div>
          </div>

          <div>
            <label htmlFor="Message" className="block text-sm font-semibold text-gray-700 mb-1">Message<span className="text-red-500">*</span></label>
            <textarea
              id="Message"
              name="Message"
              value={formData.Message}
              onChange={handleChange}
              rows={6}
              maxLength={1000}
              placeholder="Please provide detailed feedback..."
              required
              className={`w-full px-4 py-3 rounded-xl border-2 focus:border-indigo-400 transition-all bg-white/80 shadow-sm text-gray-800 resize-none ${errors.Message ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.Message && <span className="text-xs text-red-500 mt-1 block">{errors.Message}</span>}
            <div className="text-right text-xs text-gray-400 mt-1">{formData.Message.length}/1000 characters</div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoadingCompanies}
            className={`w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-95 ${isSubmitting || isLoadingCompanies ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Submitting...</span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;