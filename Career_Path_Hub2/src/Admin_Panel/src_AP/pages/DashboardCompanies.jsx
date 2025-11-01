import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaBuilding, FaFileAlt, FaTimes } from 'react-icons/fa';
import Confetti from 'react-confetti';

const mockCompanies = [
  {
    email: "hr@cloudsys.com",
    companyName: "Cloud Systems",
    crFile: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Pending"
  },
  {
    email: "info@creativeagency.com",
    companyName: "Creative Agency",
    crFile: null,
    status: "Pending"
  }
];

const DashboardCompanies = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [crUrl, setCrUrl] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState(null);

  const handleApprove = (email) => {
    setCompanies(companies.map(c => c.email === email ? { ...c, status: "Approved" } : c));
    setConfetti(true);
    setToast({ type: 'success', msg: 'Company approved!' });
    setTimeout(() => setConfetti(false), 1200);
    setTimeout(() => setToast(null), 1800);
  };
  const handleReject = (email) => {
    setCompanies(companies.map(c => c.email === email ? { ...c, status: "Rejected" } : c));
    setToast({ type: 'error', msg: 'Company rejected.' });
    setTimeout(() => setToast(null), 1800);
  };
  const viewCr = (crLink) => {
    if (crLink) setCrUrl(crLink);
    else setToast({ type: 'error', msg: 'No CR file available for this company.' });
    setTimeout(() => setToast(null), 1800);
  };
  const closeCrModal = () => setCrUrl(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex flex-col items-center font-inter">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} recycle={false} />}
      {toast && (
        <motion.div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          {toast.msg}
        </motion.div>
      )}
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-3"><FaBuilding className="text-blue-500" /> Pending Company Approvals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/90 rounded-xl shadow-lg">
            <thead className="bg-gradient-to-r from-blue-400 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Company Name</th>
                <th className="px-6 py-3 text-left">CR File</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {companies.map((company, idx) => (
                  <motion.tr
                    key={company.email}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{company.companyName}</td>
                    <td className="px-6 py-4">
                      {company.crFile ? (
                        <button onClick={() => viewCr(company.crFile)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="View CR"><FaFileAlt /></button>
                      ) : (
                        <span className="text-gray-400">No CR file</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${company.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : company.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{company.status}</span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleApprove(company.email)} className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="Approve"><FaCheckCircle /></button>
                      <button onClick={() => handleReject(company.email)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" aria-label="Reject"><FaTimesCircle /></button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* CR Modal */}
      <AnimatePresence>
        {crUrl && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeCrModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FaFileAlt className="text-blue-400" /> Company CR File</h2>
              <div className="mb-4">
                <iframe
                  src={crUrl}
                  title="CR"
                  width="100%"
                  height="500px"
                  className="border border-gray-300 rounded-lg"
                ></iframe>
              </div>
              <button
                onClick={closeCrModal}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardCompanies;