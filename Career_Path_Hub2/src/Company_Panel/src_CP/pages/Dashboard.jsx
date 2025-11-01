// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import JobPostForm from '../components/JobPostForm.jsx';
import JobList from '../components/JobList.jsx';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 space-y-6">
          <JobPostForm />
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
