import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaEye, FaPlusSquare, FaClipboard, FaCommentAlt, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/CPH-logo.png";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: "/company", icon: <FaHome />, label: "Home", color: "blue" },
    { path: "/company/ViewJobsPage", icon: <FaEye />, label: "View Jobs", color: "yellow" },
    { path: "/company/create-job", icon: <FaPlusSquare />, label: "Create Job Post", color: "green" },
    { path: "/company/create-internship", icon: <FaBriefcase />, label: "Create Internship", color: "red" },
    { path: "/company/ApplicantsPage", icon: <FaClipboard />, label: "View Applicants", color: "teal" },
    { path: "/company/FeedbackCompanyView", icon: <FaCommentAlt />, label: "Feedback", color: "purple" }
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? "256px" : "0px" }}
      className={`bg-sky-950 text-gray-200 h-screen flex flex-col overflow-hidden`}
    >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header Section */}
          <div className="flex items-center justify-center p-6 flex-shrink-0 border-b border-sky-900">
            <img
              src={logo}
              alt="Career Path Hub"
              className="h-10 w-auto mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold">Career Path Hub</h2>
              <p className="text-xs text-sky-400">Company Dashboard</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${isActive
                        ? `bg-${item.color}-600/20 text-${item.color}-400`
                        : "text-gray-300 hover:bg-sky-900/50"
                      }`
                    }
                    end={item.path === "/company"}
                  >
                    <span className={`text-xl mr-3 transition-colors duration-200
                      ${item.color === "yellow" ? "text-yellow-500" : `text-${item.color}-500`}
                    `}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-sky-900">
            <div className="bg-sky-900/30 rounded-lg p-4">
              <p className="text-xs text-sky-400 mb-1">Logged in as</p>
              <p className="text-sm font-medium truncate">Company Name</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
