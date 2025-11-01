import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaHourglassHalf, FaEye, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import Confetti from 'react-confetti';

const mockPosts = [
  {
    id: 1,
    title: "Backend Developer",
    company: "Cloud Systems",
    location: "Remote",
    type: "Full-time",
    salary: "$4000-$6000",
    status: "Pending",
    description: "Seeking a Node.js backend developer..."
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Agency",
    location: "Amman, Jordan",
    type: "Contract",
    salary: "$2000-$3000",
    status: "Pending",
    description: "Looking for a creative UI/UX designer..."
  }
];

const PendingApprovals = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [confetti, setConfetti] = useState(false);

  const handleViewDetails = (post) => setSelectedPost(post);
  const handleApprove = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, status: "Approved" } : p));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1200);
  };
  const handleReject = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, status: "Rejected" } : p));
  };
  const closeModal = () => setSelectedPost(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex flex-col items-center font-inter">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} recycle={false} />}
      <motion.div
        className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-yellow-700 mb-8 flex items-center gap-3"><FaHourglassHalf className="text-yellow-500" /> Pending Approvals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/90 rounded-xl shadow-lg">
            <thead className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Salary</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {posts.map((post, idx) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-yellow-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{post.title}</td>
                    <td className="px-6 py-4">{post.company}</td>
                    <td className="px-6 py-4">{post.location}</td>
                    <td className="px-6 py-4">{post.type}</td>
                    <td className="px-6 py-4">{post.salary}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${post.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : post.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{post.status}</span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleViewDetails(post)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="View details"><FaEye /></button>
                      <button onClick={() => handleApprove(post.id)} className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="Approve"><FaCheckCircle /></button>
                      <button onClick={() => handleReject(post.id)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" aria-label="Reject"><FaTimesCircle /></button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{selectedPost.title}</h2>
              <p className="text-gray-600 mb-2">{selectedPost.company}</p>
              <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                {selectedPost.location} | {selectedPost.type} | {selectedPost.salary}
              </div>
              <div className="mb-2 text-gray-700">{selectedPost.description}</div>
              <div className="text-right text-xs text-gray-400">Status: <span className={`font-bold ${selectedPost.status === 'Pending' ? 'text-yellow-700' : selectedPost.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>{selectedPost.status}</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingApprovals;
