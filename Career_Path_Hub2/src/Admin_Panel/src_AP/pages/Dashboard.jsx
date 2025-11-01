import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTasks, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // أيقونات لتجميل الصفحة
import { Line } from "react-chartjs-2"; // رسم بياني بسيط
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  // بيانات وهمية للإحصائيات
  const stats = {
    totalJobs: 120,
    approvedJobs: 85,
    pendingJobs: 30,
    rejectedJobs: 5,
  };

  // رسم بياني بسيط لعدد الوظائف حسب الحالة
  const data = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Job Applications",
        data: [stats.approvedJobs, stats.pendingJobs, stats.rejectedJobs],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Dashboard Overview
      </h2>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 transform -translate-y-4">
      <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-3">
          <FaTasks className="text-xl text-gray-700" />
          <div>
            <h3 className="text-md font-semibold">Total Jobs</h3>
            <p className="text-lg">{stats.totalJobs}</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-3">
          <FaCheckCircle className="text-xl text-green-600" />
          <div>
            <h3 className="text-md font-semibold">Approved Jobs</h3>
            <p className="text-lg">{stats.approvedJobs}</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-3">
          <FaTimesCircle className="text-xl text-red-600" />
          <div>
            <h3 className="text-md font-semibold">Rejected Jobs</h3>
            <p className="text-lg">{stats.rejectedJobs}</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-3">
          <FaUsers className="text-xl text-blue-600" />
          <div>
            <h3 className="text-md font-semibold">Pending Jobs</h3>
            <p className="text-lg">{stats.pendingJobs}</p>
          </div>
        </div>
      </div>

      {/* رسم بياني بسيط */}
      <div className="bg-white p-2 rounded-lg shadow-md mb-4 max-w-[95%] mx-auto transform -translate-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Job Applications Overview
        </h3>
        <Line data={data}  />
      </div>

      {/* روابط للانتقال للصفحات الأخرى */}
      {/* <div className="flex space-x-3">
        <Link
          to="/approved-posts"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400 text-sm"
        >
          View Approved Jobs
        </Link>
        <Link
          to="/pending-approvals"
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 text-sm"
        >
          View Pending Jobs
        </Link>
        <Link
          to="/rejected-posts"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 text-sm"
        >
          View Rejected Jobs
        </Link>
      </div> */}
    </div>
  );
};

export default Dashboard;
