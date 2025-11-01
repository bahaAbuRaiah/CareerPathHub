import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaBuilding, FaCheckCircle, FaArrowLeft, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const JobDetailPage = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find(j => j.id === parseInt(id));
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null
  });
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the application to your backend
    // For now, we'll just show a success message
    setSubmitStatus({
      show: true,
      success: true,
      message: "Your application has been submitted successfully! We'll be in touch soon."
    });
    setTimeout(() => {
      setShowApplicationForm(false);
      setSubmitStatus({ show: false, success: false, message: "" });
    }, 3000);
  };

  if (!job) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-800">Job not found</h2>
        <Link
          to="/"
          className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" />
        Back to Jobs
      </Link>

      {/* Job Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-indigo-600 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-gray-600">
                    <FaBuilding className="mr-2" />
                    {job.company}
                  </span>
                  <span className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {job.location}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now
            </motion.button>
          </div>

          {/* Job Meta Information */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <FaClock className="mr-2" />
                Job Type
              </div>
              <div className="font-semibold text-gray-900">{job.type}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <FaDollarSign className="mr-2" />
                Salary Range
              </div>
              <div className="font-semibold text-gray-900">{job.salary}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <FaCheckCircle className="mr-2" />
                Category
              </div>
              <div className="font-semibold text-gray-900">{job.category}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
        <p className="text-gray-600 mb-6">{job.description}</p>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
        <ul className="space-y-3">
          {job.requirements.map((requirement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start"
            >
              <FaCheckCircle className="text-green-500 mt-1 mr-3" />
              <span className="text-gray-600">{requirement}</span>
            </motion.li>
          ))}
        </ul>

        {/* Apply Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Interested in this position?</h4>
              <p className="text-gray-600">Apply now and we'll get back to you within 48 hours</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      required
                      min="0"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      required
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Tell us why you're perfect for this role..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume
                    </label>
                    <input
                      type="file"
                      name="resume"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>

                {/* Success/Error Message */}
                <AnimatePresence>
                  {submitStatus.show && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`mt-4 p-4 rounded-lg ${
                        submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDetailPage;
