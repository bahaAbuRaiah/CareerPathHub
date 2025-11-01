// src/components/ApplyButton.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplyButton = ({ jobId, userData }) => {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);  // Start loading state when the user clicks "Apply Now"

    // Create a FormData object to send the data as multipart/form-data (needed for file uploads)
    const formData = new FormData();
    formData.append('jobId', jobId);  // Add the job ID to the form data
    formData.append('name', userData.name);  // Add user's name to the form data
    formData.append('email', userData.email);  // Add user's email to the form data
    formData.append('phone', userData.phone);  // Add user's phone number to the form data
    formData.append('resume', userData.resume);  // Add the resume file to the form data (make sure this is a file)

    try {
      // Send the application data to the backend (ASP.NET API) 
      const response = await axios.post(`http://localhost:5000/jobs/api/job/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // This is important for file uploads
        },
      });

      // Show success toast message if the application was submitted successfully
      toast.success(response.data.message);
      setLoading(false);  // End loading state after receiving the response
    } catch (error) {
      // Show error message if something goes wrong during the application submission
      toast.error(error.response?.data?.message || "There was an error submitting your application.");
      setLoading(false);  // End loading state in case of an error
    }
  };

  return (
    <button
      onClick={handleApply}  // Call handleApply function when the button is clicked
      className="bg-blue-600 text-white py-3 px-6 rounded-md mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={loading}  // Disable the button while the application is being submitted
    >
      {loading ? 'Submitting...' : 'Apply Now'}  {/* Show a loading text when submitting */}
    </button>
  );
};

export default ApplyButton;
