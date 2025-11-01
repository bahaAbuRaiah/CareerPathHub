// src/components/NotificationBell.jsx
import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/solid';

export const NotificationBell = ({ notificationCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const notifications = [
    "Your job posting for 'Software Engineer Intern' has been approved.",
    "You have 3 new applicants for 'Frontend Developer'.",
    "Your CR file has been successfully verified.",
    "Your job posting for 'Marketing Specialist' was rejected.",
    "You have a new applicant for 'Data Analyst'.",
    "A new internship request is awaiting approval.",
  ];

  return (
    <div className="relative">
      {/* Bell Icon */}
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer relative"
        aria-label="Notifications"
      >
        <BellIcon className="h-8 w-8 text-blue-900 hover:text-blue-700 transition duration-300" />
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs font-bold rounded-full shadow">
            {notificationCount}
          </span>
        )}
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 text-gray-700 text-sm">
            <p className="font-semibold">Notifications</p>
          </div>
          <ul
            className="divide-y divide-gray-200 max-h-60 overflow-y-auto"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3, // set to default first notification.
            }}
          >
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-blue-100 transition cursor-pointer"
              >
                {notification}
              </li>
            ))}
          </ul>
          {notifications.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};
