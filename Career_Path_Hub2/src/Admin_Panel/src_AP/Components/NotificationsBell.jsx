import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationsBell = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fake notifications related to the admin dashboard
  const notifications = [
    "New opportunity request: Internship approval pending.",
    "New company registered: CR file needs review.",
    "5 job postings awaiting admin approval.",
    "Company XYZ updated their profile details.",
    "New feedback received from a registered company.",
  ];

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <div
        onClick={toggleDropdown}
        className="cursor-pointer relative"
        aria-label="Toggle Notifications"
      >
        <FaBell className="text-white text-2xl hover:text-gray-400 transition-colors duration-300" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs font-bold rounded-full shadow">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Notifications Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-gray-700"
                >
                  {notification}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
