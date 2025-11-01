import React from "react";

// Table component to display posts
const PendingTable = ({ posts, onViewDetails, onApprove, onReject }) => {
  return (
    <table className="min-w-full bg-white border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border border-gray-300">Job Title</th>
          <th className="py-2 px-4 border border-gray-300">Company Name</th>
          <th className="py-2 px-4 border border-gray-300">Location</th>
          <th className="py-2 px-4 border border-gray-300">Type</th>
          <th className="py-2 px-4 border border-gray-300">Application Deadline</th>
          <th className="py-2 px-4 border border-gray-300">Status</th>
          <th className="py-2 px-4 border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post) => (
            <tr key={post.id} className="text-center hover:bg-gray-50 transition-colors">
              <td className="py-2 px-4 border border-gray-300">{post.title}</td>
              <td className="py-2 px-4 border border-gray-300">{post.companyName}</td>
              <td className="py-2 px-4 border border-gray-300">{post.location}</td>
              <td className="py-2 px-4 border border-gray-300">{post.jobType || post.internshipType}</td>
              <td className="py-2 px-4 border border-gray-300">{post.applicationDeadline}</td>
              <td className={`py-2 px-4 border border-gray-300 ${post.status === "Approved" ? "text-green-500" : post.status === "Pending" ? "text-yellow-600" : "text-red-500"}`}>
                {post.status}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <div className="flex justify-center gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition-colors" onClick={() => onViewDetails(post.id)}>
                    View Details
                  </button>
                  {post.status === "Pending" && (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 transition-colors" onClick={() => onApprove(post.id)}>
                        Approve
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition-colors" onClick={() => onReject(post.id)}>
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-4 text-center text-green-600">No pending jobs available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PendingTable;
