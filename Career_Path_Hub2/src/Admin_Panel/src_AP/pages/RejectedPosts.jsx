import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../Components/Table"; // Component for displaying posts
import Modal from "../Components/Modal"; // Component for viewing post details

const RejectedPosts = () => {
  const [posts, setPosts] = useState([]); // Start with an empty array for posts
  const [selectedPost, setSelectedPost] = useState(null); // State for the selected post
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

// Fetch rejected posts from the backend API with authentication
const fetchPosts = async () => {
  setLoading(true); // Start loading
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Unauthorized: No token found.");
      window.location.href = "/login"; // Redirect to login if no token
      return;
    }

    // Fetch rejected posts with Authorization header
    const response = await axios.get("https://localhost:5000/api/Admin/Rejected", {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });

    setPosts(response.data); // Update state with API data
  } catch (error) {
    console.error("Error fetching posts:", error);

    // Handle 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      console.error("Session expired. Redirecting to login.");
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login
    } else {
      setPosts([]); // Keep posts empty in case of other errors
    }
  } finally {
    setLoading(false); // Stop loading
  }
};

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle viewing post details
  const handleViewDetails = (postId) => {
    navigate(`/admin/PostDetails/${ postId }`);
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Rejected Jobs</h2>
      <Table
        posts={posts.filter((post) => post.status === "Rejected")} // Filter to show only rejected posts
        onViewDetails={handleViewDetails} // Pass function to handle viewing details
      />
      {selectedPost && (
        <Modal
          post={selectedPost} // Pass selected post to modal
          onClose={() => setSelectedPost(null)} // Close modal handler
        />
      )}
    </div>
  );
};

export default RejectedPosts;
