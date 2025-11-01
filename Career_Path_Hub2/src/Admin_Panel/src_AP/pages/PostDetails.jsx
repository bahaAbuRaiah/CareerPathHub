import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PostDetails = ({ posts }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPostDetails = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Unauthorized: No token found. Redirecting to login.");
        window.location.href = "/login";
        return;
      }
  
      try {
        console.log("Fetching post details for ID:", postId); // Debugging log
        const response = await axios.get(
          `https://localhost:5000/api/Job/GetByID?ID=${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("API Response:", response.data); // Debugging log
        setPost(response.data); // Set fetched post data
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPostDetails();
  }, [postId]);

  const handleBack = () => {
    if (location.pathname === "/pending-approvals") {
      navigate("/"); // Navigate to home page if we're on /pending-approvals
    } else {
      navigate(-1); // Default back behavior
    }
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Unauthorized: No token found.");
        window.location.href = "/login";
        return;
      }

      await axios.patch(
        `https://localhost:5000/api/Admin/Job/Approve/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost({ ...post, status: "Approved" });
      alert("Job approved!");
    } catch (err) {
      console.error("Error approving post", err);
      alert("Failed to approve job");
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Unauthorized: No token found.");
        window.location.href = "/login";
        return;
      }

      await axios.patch(
        `https://localhost:5000/api/Admin/Job/Reject/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost({ ...post, status: "Rejected" });
      alert("Job rejected!");
    } catch (err) {
      console.error("Error rejecting post", err);
      alert("Failed to reject job");
    }
  };

  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const responsibilities = post.responsibilities || [];
  const qualifications = post.qualifications || [];

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

      {post.status === "Pending" ? (
        <div className="mt-6 flex gap-4 justify-end">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition-colors"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition-colors"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      ) : (
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
