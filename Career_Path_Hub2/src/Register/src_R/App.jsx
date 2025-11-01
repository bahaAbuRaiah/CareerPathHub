import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";

// Placeholder components for different sections
const Admin = () => <div className="p-8 text-center text-2xl">Admin Panel</div>;
const Company = () => <div className="p-8 text-center text-2xl">Company Dashboard</div>;
const FindJob = () => <div className="p-8 text-center text-2xl">Find Job Page</div>;

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Direct Access Routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/company" element={<Company />} />
      <Route path="/find-job" element={<FindJob />} />
    </Routes>
  );
};

export default App;


