import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedJobs = ({ filters = {} }) => {
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Navigation hook

  // Function to fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      if (!token) throw new Error("Unauthorized: No token found.");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      };

      const response = await axios.get(
        "https://localhost:5000/api/Job/GetJobPostsAll",
        config
      );
      setJobs(response.data || []); // Store the jobs in state
    } catch (err) {
      console.error("Error fetching jobs:", err);

      if (err.response && err.response.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        localStorage.removeItem("token"); // Remove invalid token
        window.location.href = "/login"; // Redirect to login
      } else {
        setError("Failed to load jobs. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on the provided filters
  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = filters.query
      ? job.title?.toLowerCase().includes(filters.query.toLowerCase())
      : true;
    const matchesJobType = filters.jobType
      ? job.jobType?.toLowerCase().includes(filters.jobType.toLowerCase())
      : true;
    const matchesLocation = filters.location
      ? job.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesFormType = filters.positionField
      ? job.FormType?.toLowerCase() === filters.positionField.toLowerCase() // Adjusted to match `FormType`
      : true;

    return (
      matchesQuery &&
      matchesJobType &&
      matchesLocation &&
      matchesFormType
    );
  });

  // Handle "View Details" button click
  const handleJobClick = (jobId) => {
    navigate(`/jobBoard/job/${jobId}`); // Navigate to job details page
  };

  // Render component
  return (
    <div>
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        {filters.positionField
          ? filters.positionField === "job"
            ? "Job Opportunities"
            : "Internship Opportunities"
          : "All Opportunities"}
      </h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center my-12">
          <span className="text-lg text-gray-500">Loading jobs...</span>
        </div>
      ) : error ? (
        <div className="text-center my-12">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <li
                key={job.id}
                className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Job Title */}
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                  {job.title || "Untitled Job"}
                </h3>

                {/* Job Details */}
                <p className="text-sm text-gray-500 mb-2">
                  {job.companyName || "Unknown Company"} -{" "}
                  {job.location || "Unknown Location"}
                </p>

                {/* View Details Button */}
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handleJobClick(job.id)}
                >
                  View Details
                </button>
              </li>
            ))
          ) : (
            <p>No jobs found matching your filters.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FeaturedJobs;
