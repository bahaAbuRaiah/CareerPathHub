import React from "react";

const PrivateRoute = ({ children }) => {
  // Bypass all authentication and just render the children
  return children;
};

export default PrivateRoute;