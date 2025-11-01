// EditJobPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditJobPage = () => {
  const [job, setJob] = useState(null); // State to hold the job to edit
  const { jobId } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Navigation function

  // Fetch the job details when the component mounts
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${jobId}`);
        setJob(response.data); // Set the job data for editing
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };
    
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value }); // Update the job data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/${jobId}`, job);
      navigate("/"); // Redirect to the job listing page
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={job.companyName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
