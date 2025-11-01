import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TopNavBar from "./Components/TopNavBar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ApprovedPosts from "./pages/ApprovedPosts";
import PendingApprovals from "./pages/PendingApprovals";
import RejectedPosts from "./pages/RejectedPosts";
import NotificationsBell from "./Components/NotificationsBell";
import DashboardCompanies from "./pages/DashboardCompanies";
import PostDetails from "./pages/PostDetails"; // صفحة تفاصيل الوظيفة
import "./index.css";
import FeedbackAdminView from "./pages/FeedbackAdminView";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Function to change post status
  const handleStatusChange = (id, newStatus) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status: newStatus } : post
    );
    setPosts(updatedPosts);
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
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
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
        <TopNavBar />
        
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
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Dashboard
                        posts={posts}
                        onStatusChange={handleStatusChange}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/approved-posts"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ApprovedPosts
                        posts={posts.filter((post) => post.status === "approved")}
                        onStatusChange={handleStatusChange}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/pending-approvals"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <PendingApprovals
                        posts={posts.filter((post) => post.status === "pending")}
                        onStatusChange={handleStatusChange}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/rejected-posts"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <RejectedPosts
                        posts={posts.filter((post) => post.status === "rejected")}
                        onStatusChange={handleStatusChange}
                      />
                    </motion.div>
                  }
                />
                {/* <Route path="/analytics" element={<Analytics posts={posts} />} /> */}
                <Route
                  path="/DashboardCompanies"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <DashboardCompanies posts={posts} />
                    </motion.div>
                  }
                />
                <Route
                  path="/FeedbackAdminView"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <FeedbackAdminView />
                    </motion.div>
                  }
                />
                <Route
                  path="/PostDetails/:postId"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <PostDetails />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
