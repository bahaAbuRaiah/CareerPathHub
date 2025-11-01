import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = ({ posts }) => {
  // حساب الإحصائيات
  const totalApproved = posts.filter(post => post.status === 'approved').length;
  const totalRejected = posts.filter(post => post.status === 'rejected').length;
  const totalPending = posts.filter(post => post.status === 'pending').length;

  // بيانات الرسم البياني
  const data = [
    { name: 'Approved', count: totalApproved },
    { name: 'Rejected', count: totalRejected },
    { name: 'Pending', count: totalPending },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Job Posting Analytics</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-500 text-white p-4 rounded">
          <h2 className="text-2xl font-bold">Approved Posts</h2>
          <p className="text-4xl">{totalApproved}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded">
          <h2 className="text-2xl font-bold">Rejected Posts</h2>
          <p className="text-4xl">{totalRejected}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded">
          <h2 className="text-2xl font-bold">Pending Approvals</h2>
          <p className="text-4xl">{totalPending}</p>
        </div>
      </div>

      {/* الرسم البياني */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
