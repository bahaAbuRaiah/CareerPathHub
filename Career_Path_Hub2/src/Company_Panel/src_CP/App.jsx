import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import WelcomePage from "./components/WelcomePage";
import ViewJobsPage from "./components/ViewJobsPage";
import JobPostForm from "./components/JobPostForm";
import InternshipPostForm from "./components/InternshipPostForm";
import ApplicantsPage from './pages/ApplicantsPage';
import TopBar from './components/TopNavBar';
import FeedbackCompanyView from "./pages/FeedbackCompanyView";
import { motion } from "framer-motion";
import { mockJobs, mockApplicants, mockFeedback, mockCompanyProfile } from './mockData';

function App() {
  const [entries, setEntries] = useState(mockJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [applicants, setApplicants] = useState(mockApplicants);
  const [feedback, setFeedback] = useState(mockFeedback);
  const [companyProfile, setCompanyProfile] = useState(mockCompanyProfile);

  // Add new job or internship entry
  const addEntry = (newEntry) => {
    const entry = {
      ...newEntry,
      id: entries.length + 1,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      applicants: 0
    };
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  // Add new applicant
  const addApplicant = (newApplicant) => {
    const applicant = {
      ...newApplicant,
      id: applicants.length + 1,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setApplicants((prevApplicants) => [...prevApplicants, applicant]);
  };

  // Add new feedback
  const addFeedback = (newFeedback) => {
    const feedback = {
      ...newFeedback,
      id: feedback.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setFeedback((prevFeedback) => [...prevFeedback, feedback]);
  };

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with animation */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarOpen ? "auto" : "0px" }}
        className="relative"
      >
        <Sidebar isOpen={isSidebarOpen} />
        {/* Sidebar toggle button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-sky-950 text-white p-1 rounded-full shadow-lg hover:bg-sky-800 transition-colors duration-200"
        >
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <TopBar companyProfile={companyProfile} />

        {/* Main Content Area with animation */}
        <motion.div 
          className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={
                <motion.div variants={pageVariants}>
                  <WelcomePage companyProfile={companyProfile} recentJobs={entries.slice(0, 3)} />
                </motion.div>
              } />
              <Route path="/ViewJobsPage" element={
                <motion.div variants={pageVariants}>
                  <ViewJobsPage entries={entries} isLoading={isLoading} />
                </motion.div>
              } />
              <Route path="/create-job" element={
                <motion.div variants={pageVariants}>
                  <JobPostForm onSubmit={addEntry} />
                </motion.div>
              } />
              <Route path="/create-internship" element={
                <motion.div variants={pageVariants}>
                  <InternshipPostForm onSubmit={addEntry} />
                </motion.div>
              } />
              <Route path="/ApplicantsPage" element={
                <motion.div variants={pageVariants}>
                  <ApplicantsPage applicants={applicants} onAddApplicant={addApplicant} />
                </motion.div>
              } />
              <Route path="/applicants/:jobId" element={
                <motion.div variants={pageVariants}>
                  <ApplicantsPage applicants={applicants} onAddApplicant={addApplicant} />
                </motion.div>
              } />
              <Route path="/FeedbackCompanyView" element={
                <motion.div variants={pageVariants}>
                  <FeedbackCompanyView feedback={feedback} onAddFeedback={addFeedback} />
                </motion.div>
              } />
            </Routes>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

