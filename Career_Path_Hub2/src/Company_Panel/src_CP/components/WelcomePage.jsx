import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { AiOutlineBulb, AiOutlineRightCircle } from 'react-icons/ai';

const cardClasses = "bg-white shadow-lg rounded-lg p-8";

const TipItem = React.memo(({ icon, text }) => (
  <div className="flex items-start mb-3 group">
    {icon}
    <p className="text-md text-gray-700">
      {text}
      <span className="hidden group-hover:inline-block text-blue-500 ml-2 transition-opacity duration-300">
        Learn more <AiOutlineRightCircle />
      </span>
    </p>
  </div>
));

const WelcomeMessage = () => (
  <div className={`flex flex-col items-start justify-center p-8 md:w-7/12 w-full ${cardClasses}`}>
    <div className="flex items-center mb-4">
      <FaBriefcase className="text-blue-900 h-12 w-12 mr-3" aria-label="Briefcase icon" />
      <h1 className="text-3xl font-bold text-blue-900">
        Welcome to the Job Management Dashboard
      </h1>
    </div>
    <p className="text-lg text-gray-700">
      <strong>Need help?</strong> Select an option from the sidebar to get started.
    </p>
    <p className="text-md text-gray-600 mt-2">
      Follow the quick tips or check out the latest updates in the panel to your right.
    </p>
    <button className="mt-6 px-4 py-2 bg-blue-900 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      Get Started
    </button>
  </div>
);

const TipsAndUpdates = () => (
  <div className={`md:w-5/12 w-full mt-8 md:mt-0 md:ml-6 flex flex-col items-start justify-center ${cardClasses}`}>
    <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick Tips</h2>
    <TipItem
      icon={<AiOutlineBulb className="text-green-600 h-6 w-6 mr-3" />}
      text="How to post a new job or internship efficiently."
    />
    <TipItem
      icon={<AiOutlineBulb className="text-green-600 h-6 w-6 mr-3" />}
      text="Tips on reviewing job applications and approvals."
    />
    <h2 className="text-xl font-semibold text-blue-900 mt-6 mb-4">Latest Updates</h2>
    <p className="text-md text-gray-600">
      Check out the new features added in the recent update to improve your workflow!
    </p>
  </div>
);

const WelcomePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full bg-gradient-to-r from-blue-100 via-white to-blue-100 p-8">
      {/* Left Side - Welcome Message */}
      <WelcomeMessage />

      {/* Right Side - Tips and Updates */}
      <TipsAndUpdates />
    </div>
  );
};

export default WelcomePage;