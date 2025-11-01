import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import '../../styles/Register.css';

const Register = () => {
  // State for form fields
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for submission

  // Validation functions
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^962[6789][0-9]{7}$/.test(phone);
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!_])[A-Za-z\d@#$%^&*!_]{8,}$/.test(
      password
    );

  // Validate individual fields dynamically
  // Function to validate file input
  const validateFile = (file) => {
    const allowedExtensions = ["pdf", "jpg", "png"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const fileExtension = file?.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return "Only PDF, JPG, or PNG files are allowed.";
    }
    if (file.size > maxSizeInBytes) {
      return "File size must be less than 5MB.";
    }
    return ""; // No errors
  };

  // Handle file change and validation
  const handleFileChange1 = (e, field) => {
    const file = e.target.files[0];
    const error = validateFile(file);

    if (error) {
      // Update error state if validation fails
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: error,
      }));
    } else {
      // Clear error if validation passes
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
      setCompanyId(file); // Save the valid file
    }
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "role":
        if (!value) error = "Please select your role.";
        break;
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!isValidEmail(value)) error = "Invalid email format.";
        break;
      case "phone":
        if (!isValidPhone(value)) error = "Invalid phone number format.";
        break;
      case "password":
        if (!isValidPassword(value))
          error =
            "Password must be at least 8 characters, include 1 letter, 1 number, and 1 symbol.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  // Handle file validation
  const validateFile1 = (file) => {
    const allowedExtensions = ["pdf", "jpg", "png"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return "Only PDF, JPG, or PNG files are allowed.";
    }
    if (file.size > maxSizeInBytes) {
      return "File size must be less than 5MB.";
    }
    return "";
  };

  // Handle file changes
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    const error = validateFile(file);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: error,
      }));
      return;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
    setCompanyId(file); // Only applies to companyId
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Bypass validation and directly set the role
    const selectedRole = role || "Student"; // Default to Student if no role selected
    // Store role in localStorage without authentication
    localStorage.setItem("userRole", selectedRole);
    // Direct navigation based on role
    switch (selectedRole) {
      case "Admin":
        window.location.href = "/Admin";
        break;
      case "Company":
        window.location.href = "/Company";
        break;
      case "Student":
        window.location.href = "/";
        break;
      default:
        window.location.href = "/";
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2784&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 backdrop-blur-[2px]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-blue-100">Join us to start your career journey</p>
          </div>
          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Register As
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      validateField("role", e.target.value);
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.role
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors bg-white`}
                  >
                    <option value="">Select Role</option>
                    <option value="Company">Register as a Company</option>
                    <option value="Student">Register as a Student</option>
                  </select>
                  <FaRegUser className="absolute right-3 top-3.5 text-gray-400 text-xl" />
                </div>
                {errors.role && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.role}
                  </motion.p>
                )}
              </div>
              {/* Company ID Upload */}
              {role === "Company" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-gray-700 text-sm font-semibold">
                    Company Registration ID
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileChange(e, "companyId")}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.companyId
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                  </div>
                  {errors.companyId && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.companyId}
                    </motion.p>
                  )}
                </motion.div>
              )}
              {/* Name */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {role === "Company" ? "Company Name" : "Full Name"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={role === "Company" ? "Enter company name" : "Enter your full name"}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      validateField("name", e.target.value);
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  />
                  <FaPencilAlt className="absolute right-3 top-3.5 text-gray-400 text-xl" />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>
              {/* Email and Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateField("email", e.target.value);
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                    />
                    <MdOutlineMailOutline className="absolute right-3 top-3.5 text-gray-400 text-xl" />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="96287609193"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        validateField("phone", e.target.value);
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                    />
                    <FaPhoneFlip className="absolute right-3 top-3.5 text-gray-400 text-xl" />
                  </div>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validateField("password", e.target.value);
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  />
                  <RiLock2Fill className="absolute right-3 top-3.5 text-gray-400 text-xl" />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
                <p className="text-gray-500 text-xs mt-2">
                  Password must be at least 8 characters long and include uppercase, number, and special character
                </p>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 