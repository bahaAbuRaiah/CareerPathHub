import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/src_H/App";
import AdminPanel from "./Admin_Panel/src_AP/App";
import Register from "./Register/src_R/App";
import JobBoard from "./Job_board/src_J/App";
import CompanyPanel from "./Company_Panel/src_CP/App";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./components/Unauthorized"; // تأكد من وجود هذا المكون
// Correct import statement (adjust path as needed)
import FeedbackForm from './components/feedback/FeedbackForm';
import ExamPage from './features/exam/pages/ExamPage';
import ResultPage from './features/exam/pages/ResultPage';
import CVBuilderPage from '../cvBuilder/CVBuilderPage';
const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Software Engineer",
      companyName: "Tech Corp",
      location: "Amman",
      jobType: "Hybrid",
      applicationDeadline: "2024-02-15",
      description: "A great opportunity for a software engineer.",
      status: "Approved",
    },
    {
      id: 2,
      title: "Marketing Intern",
      companyName: "Biz Inc",
      location: "Amman",
      jobType: "On-Site",
      applicationDeadline: "2024-03-01",
      description: "Hands-on internship providing exposure to marketing.",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status: newStatus } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Admin Panel */}
      <Route
        path="/admin/*"
        element={
          <AdminPanel posts={posts} onStatusChange={handleStatusChange} />
        }
      />

      {/* Register/Login Pages */}
      <Route path="/register/*" element={<Register />} />
      <Route path="/login/*" element={<Register />} />

      {/* Job Board - handle both case variations */}
      <Route path="/jobBoard/*" element={<JobBoard />} />
      <Route path="/job/*" element={<JobBoard />} />

      {/* Company Panel */}
      <Route path="/company/*" element={<CompanyPanel />} />

      {/* Feedback Form */}
      <Route path="/feedback" element={<FeedbackForm />} />

      {/* Exam Page */}
      <Route path="/exam" element={<ExamPage />} />

      {/* Result Page */}
      <Route path="/result" element={<ResultPage />} />

      {/* CV Builder */}
      <Route path="/cv-builder" element={<CVBuilderPage />} />

      {/* 404 Page */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;