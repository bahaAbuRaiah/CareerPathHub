const FeedbackItem = ({ feedback, isAdmin }) => {
    return (
      <div className="feedback-item card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{feedback.title}</h5>
            <span className="badge bg-secondary">{feedback.category}</span>
          </div>
          {isAdmin && (
            <h6 className="card-subtitle mb-2 text-muted">
              Company: {feedback.companyName || `ID: ${feedback.companyId}`}
            </h6>
          )}
          <p className="card-text">{feedback.message}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-warning">
                {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
              </span>
            </div>
            <small className="text-muted">
              Submitted by {feedback.createdBy} on {new Date(feedback.createdDate).toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeedbackItem;