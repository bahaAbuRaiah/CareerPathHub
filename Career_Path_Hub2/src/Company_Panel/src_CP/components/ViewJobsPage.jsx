import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaEdit, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Amman, Jordan",
    type: "Full-time",
    salary: "$3000-$4500",
    description: "We are looking for a React developer...",
    requirements: ["3+ years React", "TypeScript", "UI/UX"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Marketing Co.",
    location: "Remote",
    type: "Full-time",
    salary: "$2500-$3500",
    description: "Seeking a creative Marketing Manager...",
    requirements: ["3+ years marketing", "Social media"],
    posted: "5 days ago"
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "AI Solutions Ltd",
    location: "Hybrid",
    type: "Internship",
    salary: "$800",
    description: "Great opportunity for students...",
    requirements: ["Statistics", "Python", "Student"],
    posted: "Just now"
  }
];

const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

const ViewJobsPage = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updatedJob, setUpdatedJob] = useState(null);

  // View job details
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
  };
  // Edit job
  const handleEditJob = (job) => {
    setUpdatedJob({ ...job });
    setIsEditModalOpen(true);
  };
  // Close modals
  const closeViewModal = () => { setIsViewModalOpen(false); setSelectedJob(null); };
  const closeEditModal = () => { setIsEditModalOpen(false); setUpdatedJob(null); };
  // Update job in list
  const handleUpdateJob = (e) => {
    e.preventDefault();
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    closeEditModal();
  };
  // Add job (mock)
  const handleAddJob = () => {
    const newJob = {
      id: jobs.length + 1,
      title: "New Job Title",
      company: "New Company",
      location: "Location",
      type: "Full-time",
      salary: "$0",
      description: "Job description...",
      requirements: ["Requirement 1"],
      posted: "Just now"
    };
    setJobs([newJob, ...jobs]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 relative font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Job Listings</h1>
          <button
            onClick={handleAddJob}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FaPlus /> Add Job
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-100 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-1">{job.title}</h2>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleViewDetails(job)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="View details"><FaEye /></button>
                  <button onClick={() => handleEditJob(job)} className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Edit job"><FaEdit /></button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FaMapMarkerAlt /> {job.location}
                <FaClock /> {job.type}
                <FaDollarSign /> {job.salary}
              </div>
              <div className="mt-2 text-gray-700 line-clamp-2">{job.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.requirements.map((req, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">{req}</span>
                ))}
              </div>
              <div className="text-right text-xs text-gray-400">{job.posted}</div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedJob && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeViewModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{selectedJob.title}</h2>
              <p className="text-gray-600 mb-2">{selectedJob.company}</p>
              <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                <FaMapMarkerAlt /> {selectedJob.location}
                <FaClock /> {selectedJob.type}
                <FaDollarSign /> {selectedJob.salary}
              </div>
              <div className="mb-2 text-gray-700">{selectedJob.description}</div>
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Requirements:</span>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right text-xs text-gray-400">{selectedJob.posted}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && updatedJob && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleUpdateJob}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeEditModal} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Edit Job</h2>
              {Object.keys(updatedJob).map((key) => (
                key !== 'id' && key !== 'posted' && key !== 'requirements' && (
                  <div key={key} className="mb-3">
                    <label className="block text-gray-700 font-semibold mb-1">{formatKey(key)}</label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={updatedJob[key]}
                      onChange={e => setUpdatedJob({ ...updatedJob, [key]: e.target.value })}
                    />
                  </div>
                )
              ))}
              <div className="mb-3">
                <label className="block text-gray-700 font-semibold mb-1">Requirements (comma separated)</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={updatedJob.requirements.join(', ')}
                  onChange={e => setUpdatedJob({ ...updatedJob, requirements: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400">Save Changes</button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewJobsPage;
