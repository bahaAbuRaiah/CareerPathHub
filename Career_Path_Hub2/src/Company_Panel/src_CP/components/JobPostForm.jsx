import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaClock, FaList, FaCheckCircle, FaUsers, FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Confetti from 'react-confetti';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    email: "",
    jobType: "Full-time",
    applicationDeadline: "",
    qualifications: [""],
    responsibilities: [""],
    formType: "Job",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const jordanStates = [
    "Amman", "Irbid", "Zarqa", "Aqaba", "Mafraq", "Ma'an", "Karak", "Tafilah", "Ajloun", "Jerash", "Balqa", "Madaba",
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleArrayChange = (e, arrayName, index) => {
    const { value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData((prevData) => ({ ...prevData, [arrayName]: updatedArray }));
  };
  const addArrayItem = (arrayName) => {
    setFormData((prevData) => ({ ...prevData, [arrayName]: [...prevData[arrayName], ""] }));
  };
  const removeArrayItem = (arrayName, index) => {
    setFormData((prevData) => ({ ...prevData, [arrayName]: prevData[arrayName].filter((_, i) => i !== index) }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex flex-col items-center font-inter">
      {success && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} />}
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-14 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"><FaBriefcase className="text-indigo-500" /> Post a New Job</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <AnimatePresence mode="wait">
            {!success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Section: Basic Info */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2"><FaBuilding /> Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Job Title</label>
                      <input id="title" value={formData.title} onChange={handleChange} placeholder="e.g. Frontend Developer" className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Company Name</label>
                      <input id="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Tech Solutions" className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Location</label>
                      <select id="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                        <option value="">Select location</option>
                        {jordanStates.map((state) => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Job Type</label>
                      <select id="jobType" value={formData.jobType} onChange={handleChange} className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                        <option value="">Select job type</option>
                        {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Section: Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2"><FaList /> Job Description</h2>
                  <textarea id="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Describe the role, responsibilities, and expectations..." className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                </div>
                {/* Section: Qualifications & Responsibilities */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2"><FaCheckCircle /> Qualifications & Responsibilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                      {formData.qualifications.map((q, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={q} onChange={e => handleArrayChange(e, 'qualifications', i)} placeholder="e.g. Bachelor's degree" className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                          <button type="button" onClick={() => removeArrayItem('qualifications', i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none">Remove</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('qualifications')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 focus:outline-none">Add Qualification</button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                      {formData.responsibilities.map((r, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={r} onChange={e => handleArrayChange(e, 'responsibilities', i)} placeholder="e.g. Lead a team" className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                          <button type="button" onClick={() => removeArrayItem('responsibilities', i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none">Remove</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('responsibilities')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 focus:outline-none">Add Responsibility</button>
                    </div>
                  </div>
                </div>
                {/* Section: Contact & Deadline */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2"><FaUsers /> Contact & Deadline</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Contact Email</label>
                      <input id="email" value={formData.email} onChange={handleChange} placeholder="e.g. hr@company.com" className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                    <div className="relative mb-4">
                      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 pointer-events-none">Application Deadline</label>
                      <input id="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={handleChange} className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2">
                  {isSubmitting && <FaBriefcase className="animate-spin" />} Post Job
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
              <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">Job Posted Successfully!</h2>
              <p className="text-gray-700 mb-6">Your job listing is now live.</p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default JobPostForm;
