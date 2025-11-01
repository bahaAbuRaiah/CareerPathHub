// src/components/EmailNotifications.jsx
import React, { useState } from 'react';

const EmailNotifications = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    onSubscribe(email);
  };

  return (
    <div className="p-6 text-center">
      <h3 className="text-xl font-medium text-gray-800">Subscribe for Job Alerts</h3>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubscribe}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Subscribe
      </button>
    </div>
  );
};

export default EmailNotifications;
