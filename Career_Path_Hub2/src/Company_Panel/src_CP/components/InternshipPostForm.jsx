import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Jordan governorates
const jordanGovernates = [
  "Amman",
  "Irbid",
  "Zarqa",
  "Balqa",
  "Mafraq",
  "Tafilah",
  "Karak",
  "Ma’an",
  "Jerash",
  "Ajloun",
  "Madaba",
  "Aqaba",
];

const InternshipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    internshipType: "",
    duration: "",
    applicationDeadline: "",
    description: "",
    responsibilities: [""],
    qualifications: [""],
    formType: "Internship",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleArrayChange = (e, arrayName, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedArray = [...prevData[arrayName]];
      updatedArray[index] = value;
      return { ...prevData, [arrayName]: updatedArray };
    });
  };

  const addArrayItem = (arrayName) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], ""],
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      companyName: "",
      location: "",
      internshipType: "",
      duration: "",
      applicationDeadline: "",
      description: "",
      responsibilities: [""],
      qualifications: [""],
    });
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !formData.title ||
      !formData.companyName ||
      !formData.location ||
      !formData.internshipType ||
      !formData.duration ||
      !formData.applicationDeadline ||
      !formData.description ||
      !formData.responsibilities.length ||
      !formData.qualifications.length
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    // Send data to backend API (replace URL with the actual API endpoint)
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
    
      if (!token) {
        setError("Unauthorized: Please log in.");
        window.location.href = "/login"; // Redirect to login if no token
        return;
      }
    
      // Send internship data to the server with authentication
      const response = await axios.post(
        "https://localhost:5000/api/Job/Add",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
            Authorization: `Bearer ${token}`, // Include token in headers
          },
          withCredentials: true,
        }
      );
    
      // Handle response after successful submission
      if (response.status === 200) {
        setFormData({
          title: "",
          companyName: "",
          location: "",
          internshipType: "",
          duration: "",
          applicationDeadline: "",
          description: "",
          responsibilities: [""],
          qualifications: [""],
        });
        setSubmitted(true);
        setSubmissionSuccess(true);
        setError("");
    
        // Optional: Navigate to the internship listing page (or another page)
        navigate("/internship-list");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    
      // Handle 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        setError("Unauthorized: Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        window.location.href = "/login"; // Redirect to login
        return;
      }
    
      // Handle other errors
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while submitting the internship opportunity. Please try again.";
      setError(errorMessage);
      setSubmissionSuccess(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Internship Opportunity Form
      </h2>

      {submitted && !error && (
        <div className="text-center text-green-600 font-semibold mb-4">
          Your internship opportunity has been submitted successfully!
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">
          {error}
        </div>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Internship Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
            Internship Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter internship title"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-black"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-black"
          >
            Location
          </label>
          <select
            id="location"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {jordanGovernates.map((governate, index) => (
              <option key={index} value={governate}>
                {governate}
              </option>
            ))}
          </select>
        </div>

        {/* Internship Type */}
        <div>
          <label
            htmlFor="internshipType"
            className="block text-sm font-medium text-black"
          >
            Internship Type
          </label>
          <select
            id="internshipType"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.internshipType}
            onChange={handleChange}
          >
            <option value="">Select Internship Type</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-black"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            placeholder="Enter internship duration (e.g., 3 months)"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label
            htmlFor="applicationDeadline"
            className="block text-sm font-medium text-black"
          >
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </div>

        {/* Internship Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-black"
          >
            Internship Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the internship responsibilities and requirements"
            rows="3"
            className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Qualifications */}
        <div>
          <label
            htmlFor="qualifications"
            className="block text-sm font-medium text-black"
          >
            Qualifications
          </label>
          {formData.qualifications.map((qualification, index) => (
            <input
              key={index}
              type="text"
              value={qualification}
              onChange={(e) => handleArrayChange(e, "qualifications", index)}
              placeholder={`Qualification #${index + 1}`}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("qualifications")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 hover:scale-40 transition-all duration-300 ease-in-out"
          >
            Add Qualification
          </button>
        </div>

        {/* Responsibilities */}
        <div>
          <label
            htmlFor="responsibilities"
            className="block text-sm font-medium text-black"
          >
            Responsibilities
          </label>
          {formData.responsibilities.map((responsibility, index) => (
            <input
              key={index}
              type="text"
              value={responsibility}
              onChange={(e) => handleArrayChange(e, "responsibilities", index)}
              placeholder={`Responsibility #${index + 1}`}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("responsibilities")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Responsibility
          </button>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-green-800 hover:scale-40 transition-all duration-300 ease-in-out"
          >
            Submit Internship Opportunity
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternshipForm;
