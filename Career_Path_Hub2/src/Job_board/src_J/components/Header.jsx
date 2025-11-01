import React from "react";
import AdminPanel from "../../../Admin_Panel/src_AP/App";
import Logo from "../../../Company_Panel/src_CP/assets/CPH-logo.png";
const Header = ({ userRole }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-16 w-auto " />
          <a href="/" className="text-xl font-bold">
            Career Path Hub
          </a>
        </div>

        {/* Navigation Links (Aligned to the Right End) */}
        <div className="flex items-center space-x-6 ml-auto">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {" "}
            Home{" "}
          </button>{" "}
          {/* <div className="flex items-center space-x-4">
          {userRole === "company" && (
            <a
              href="/post-job"
              className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Post A Job
            </a>
          )}
          {userRole === "Admin" && (
            <a
              href="/company"
              className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Admin Panel
            </a>
          )}
          {userRole === "student" && (
            <a
              href="/take-test"
              className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Take Test
            </a>
          )}
        </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
