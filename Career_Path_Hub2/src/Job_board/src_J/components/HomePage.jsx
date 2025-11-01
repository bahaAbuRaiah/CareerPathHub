import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaBookmark, FaFilter, FaBuilding } from 'react-icons/fa';

const JobCard = React.memo(({ job, isBookmarked, onBookmark }) => {
  const isNew = useMemo(() => {
    if (!job.posted) return false;
    if (job.posted.toLowerCase().includes('just now')) return true;
    if (job.posted.toLowerCase().includes('day')) {
      const num = parseInt(job.posted);
      return num <= 3;
    }
    return false;
  }, [job.posted]);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:border-indigo-300 overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400"
      tabIndex={0}
      aria-label={`Job: ${job.title} at ${job.company}`}
    >
      <Link to={`/job/${job.id}`} className="block p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center overflow-hidden border border-indigo-200 shadow-sm">
              {job.logo ? (
                <img src={job.logo} alt="Company logo" className="w-10 h-10 object-contain" loading="lazy" />
              ) : (
                <FaBuilding className="text-indigo-300 text-2xl" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>
          <button
            className={`relative text-gray-400 hover:text-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full p-2 ${isBookmarked ? 'text-indigo-600' : ''}`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
            onClick={e => { e.preventDefault(); onBookmark(job.id); }}
            tabIndex={0}
          >
            <motion.span
              initial={false}
              animate={{ scale: isBookmarked ? 1.2 : 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.25 }}
            >
              <FaBookmark />
            </motion.span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              {isBookmarked ? 'Remove from saved' : 'Save job'}
            </span>
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <FaMapMarkerAlt className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <FaClock className="mr-2" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <FaDollarSign className="mr-2" />
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
            {job.category}
          </span>
          <span className="text-sm text-gray-500">
            {job.posted}
          </span>
        </div>
        <AnimatePresence>
          {isNew && (
            <motion.span
              initial={{ opacity: 0, rotate: -10, y: -10 }}
              animate={{ opacity: 1, rotate: 5, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg drop-shadow-lg animate-bounce"
              style={{ zIndex: 10 }}
            >
              NEW
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
});

const HomePage = ({ jobs }) => {
  const [filters, setFilters] = useState({
    jobType: 'all',
    location: 'all',
    experience: 'all'
  });
  const [bookmarks, setBookmarks] = useState([]);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const locations = ['Remote', 'On-site', 'Hybrid'];
  const experiences = ['Entry Level', 'Mid Level', 'Senior Level'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchType = filters.jobType === 'all' || job.type?.toLowerCase() === filters.jobType;
      const matchLocation = filters.location === 'all' || job.location?.toLowerCase() === filters.location;
      return matchType && matchLocation;
    });
  }, [jobs, filters]);

  const handleBookmark = (jobId) => {
    setBookmarks(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const handleClearFilters = () => {
    setFilters({ jobType: 'all', location: 'all', experience: 'all' });
  };

  return (
    <div className="pt-20 relative">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ background: 'radial-gradient(circle at 20% 30%, #a5b4fc 0%, transparent 70%), radial-gradient(circle at 80% 70%, #c4b5fd 0%, transparent 70%)' }}
      />
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 rounded-3xl mb-8 overflow-hidden shadow-xl">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
            >
              Find Your Dream Job
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-indigo-100 mb-8"
            >
              Discover thousands of job opportunities with all the information you need
            </motion.p>
            <Link to="/jobBoard/company/create-job">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                whileFocus={{ scale: 1.08 }}
                className="px-8 py-3 bg-white/20 text-white font-bold rounded-xl shadow-lg backdrop-blur-lg border-2 border-white/30 hover:bg-white/30 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-white animate-pulse"
              >
                Post a Job
              </motion.button>
            </Link>
          </div>
        </div>
        {/* Filters Section */}
        <motion.div
          className="sticky top-4 z-20 mb-8 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Job filters"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Available Positions</h2>
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold" aria-label="Show filters">
                <FaFilter className="text-gray-600" />
                <span className="text-gray-600">Filters</span>
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 transition-colors duration-200 font-bold shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Clear filters"
              >
                Clear Filters
              </button>
            </div>
          </div>
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <select
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 focus:outline-none"
                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                value={filters.jobType}
                aria-label="Filter by job type"
                tabIndex={0}
              >
                <option value="all">All Job Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
              <select
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 focus:outline-none"
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                value={filters.location}
                aria-label="Filter by location"
                tabIndex={0}
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location.toLowerCase()}>{location}</option>
                ))}
              </select>
              <select
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 focus:outline-none"
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                value={filters.experience}
                aria-label="Filter by experience"
                tabIndex={0}
              >
                <option value="all">All Experience Levels</option>
                {experiences.map(exp => (
                  <option key={exp} value={exp.toLowerCase()}>{exp}</option>
                ))}
              </select>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {/* Jobs Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Job listings"
          aria-live="polite"
        >
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isBookmarked={bookmarks.includes(job.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
