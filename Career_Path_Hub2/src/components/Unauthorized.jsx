import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4">You do not have permission to access this page.</p>
      <Link to="/" className="mt-6 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;