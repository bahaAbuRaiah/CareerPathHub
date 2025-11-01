import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ companyProfile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(7);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Your job posting for 'Software Engineer Intern' has been approved.",
      time: "2 minutes ago"
    },
    {
      id: 2,
      type: "error",
      message: "Your job posting for 'Marketing Specialist' has been rejected.",
      time: "1 hour ago"
    },
    {
      id: 3,
      type: "info",
      message: "You have 1 new applicant for the 'Data Analyst' position.",
      time: "3 hours ago"
    },
    {
      id: 4,
      type: "success",
      message: "Your company profile update has been successfully reviewed.",
      time: "5 hours ago"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
        setNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left section - Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, applicants, or posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-6">
          {/* Help Button */}
          <button className="text-gray-500 hover:text-sky-600 transition-colors duration-200">
            <FaRegQuestionCircle className="text-xl" />
          </button>

          {/* Notifications */}
          <div className="dropdown-container relative">
            <button
              className="relative text-gray-500 hover:text-sky-600 transition-colors duration-200"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <FaBell className="text-xl" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button
                        className="text-xs text-sky-600 hover:text-sky-800"
                        onClick={() => setUnreadCount(0)}
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                          notification.type === 'error' ? 'border-l-4 border-l-red-500' :
                          notification.type === 'success' ? 'border-l-4 border-l-green-500' :
                          'border-l-4 border-l-blue-500'
                        }`}
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-sm text-sky-600 hover:text-sky-800">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown-container relative">
            <button
              className="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {companyProfile?.logo ? (
                <img 
                  src={companyProfile.logo} 
                  alt={companyProfile.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
              <span className="text-sm font-medium">{companyProfile?.name || 'Company Name'}</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {companyProfile?.logo ? (
                        <img 
                          src={companyProfile.logo} 
                          alt={companyProfile.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-4xl text-gray-400" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{companyProfile?.name}</h4>
                        <p className="text-xs text-gray-500">{companyProfile?.industry}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => navigate("/company/profile")}
                    >
                      Profile Settings
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => navigate("/company/settings")}
                    >
                      Account Settings
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
