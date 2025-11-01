import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PostDetails = ({ posts }) => {
  const { postId } = useParams(); // Getting postId from URL
  const [post, setPost] = useState(null); // Local state for the post
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error  
  const navigate = useNavigate(); // Navigate hook
  const location = useLocation(); // Location hook to get current route

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try to fetch post details from API
        const response = await axios.get(
          `https://your-api-url.com/posts/${postId}`
        );
        setPost(response.data); // If successful, update the post state
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true); // If an error occurs, set error state
        // Fallback to props.posts if API fails
        const fallbackPost = posts.find((p) => p.id === parseInt(postId));
        setPost(fallbackPost);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPost(); // Call the fetch function
  }, [postId, posts]); // Re-run when postId or posts change

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading post details...</div>;
  }

  // If no post is found, show an error message
  if (!post) {
    return <div>Post not found.</div>;
  }

  // Ensure responsibilities and qualifications are arrays
  const responsibilities = post.responsibilities || [];
  const qualifications = post.qualifications || [];

  // Handle Back button click with conditional navigation
  const handleBack = () => {
    if (location.pathname === '/pending-approvals') {
      navigate('/'); // Navigate to home page if we're on /pending-approvals
    } else {
      navigate(-1); // Default back behavior (go back to the previous page)
    }
  };

  // Approve/Reject functionality for Pending jobs
  const handleApprove = async () => {
    try {
      await axios.patch(`/api/posts/${postId}/approve`);
      setPost({ ...post, status: "Approved" }); // Update the status locally
      alert("Job approved!");
    } catch (err) {
      console.error("Error approving post", err);
      alert("Failed to approve job");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`/api/posts/${postId}/reject`);
      setPost({ ...post, status: "Rejected" }); // Update the status locally
      alert("Job rejected!");
    } catch (err) {
      console.error("Error rejecting post", err);
      alert("Failed to reject job");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">{post.title || "No title"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <strong>Company Name:</strong> {post.companyName || "N/A"}
          </div>
          <div>
            <strong>Location:</strong> {post.location || "N/A"}
          </div>
          <div>
            <strong>Type:</strong> {post.jobType || "N/A"}
          </div>
          <div>
            <strong>Duration:</strong> {post.duration || "N/A"}
          </div>
          <div>
            <strong>Application Deadline:</strong>{" "}
            {post.applicationDeadline || "N/A"}
          </div>
        </div>

        <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <strong>Description:</strong>{" "}
            {post.description || "No description available"}
          </div>
          <div>
            <strong>Responsibilities:</strong>
            <ul className="list-disc pl-5">
              {responsibilities.length > 0
                ? responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))
                : "No responsibilities available"}
            </ul>
          </div>
          <div>
            <strong>Qualifications:</strong>
            <ul className="list-disc pl-5">
              {qualifications.length > 0
                ? qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))
                : "No qualifications available"}
            </ul>
          </div>
        </div>
      </div>

      {/* Conditional Buttons */}
      {post.status === "Pending" ? (
        <div className="mt-6 flex gap-4 justify-end">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition-colors"
            onClick={handleApprove} // Approve job
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition-colors"
            onClick={handleReject} // Reject job
          >
            Reject
          </button>
        </div>
      ) : (
        // Just back button if job is approved or rejected
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors"
            onClick={handleBack} // Go back based on condition
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
