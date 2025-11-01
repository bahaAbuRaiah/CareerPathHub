import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBuilding,
  FaCommentAlt,
  FaChartBar
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: "/admin", icon: <FaHome />, label: "Dashboard", color: "blue" },
    { path: "/admin/approved-posts", icon: <FaCheckCircle />, label: "Approved Posts", color: "green" },
    { path: "/admin/pending-approvals", icon: <FaClock />, label: "Pending Posts", color: "yellow" },
    { path: "/admin/rejected-posts", icon: <FaTimesCircle />, label: "Rejected Posts", color: "red" },
    { path: "/admin/DashboardCompanies", icon: <FaBuilding />, label: "Companies", color: "purple" },
    { path: "/admin/FeedbackAdminView", icon: <FaCommentAlt />, label: "Feedback", color: "teal" }
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? "256px" : "0px" }}
      className={`bg-indigo-900 text-gray-200 h-screen flex flex-col overflow-hidden`}
    >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header Section */}
          <div className="flex items-center justify-center p-6 flex-shrink-0 border-b border-indigo-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <FaChartBar className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Admin Panel</h2>
                <p className="text-xs text-indigo-300">Career Path Hub</p>
              </div>
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
                        ? `bg-${item.color}-500/20 text-${item.color}-300`
                        : "text-gray-300 hover:bg-indigo-800/50"
                      }`
                    }
                    end={item.path === "/admin"}
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
          <div className="p-4 border-t border-indigo-800">
            <div className="bg-indigo-800/30 rounded-lg p-4">
              <p className="text-xs text-indigo-300 mb-1">Logged in as</p>
              <p className="text-sm font-medium truncate">Administrator</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
