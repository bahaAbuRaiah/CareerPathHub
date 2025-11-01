import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaPhone, FaFilePdf, FaCheckCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const mockApplicants = [
  {
    name: "Sara Al-Fayez",
    email: "sara.fayez@email.com",
    phone: "+962 7 9000 1234",
    cv: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    name: "Omar Khaled",
    email: "omar.khaled@email.com",
    phone: "+962 7 8000 5678",
    cv: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    name: "Lina Haddad",
    email: "lina.haddad@email.com",
    phone: "+962 7 7000 2468",
    cv: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState(mockApplicants);
  const [cvUrl, setCvUrl] = useState(null);
  const [referSuccess, setReferSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInterviewReferral = (applicantName) => {
    setReferSuccess(true);
    setTimeout(() => setReferSuccess(false), 1800);
  };

  const viewCv = (cvLink) => {
    if (cvLink) {
      setCvUrl(cvLink);
    }
  };

  const closeCvModal = () => {
    setCvUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex flex-col items-center font-inter">
      {referSuccess && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} recycle={false} />}
      <motion.div
        className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 font-semibold focus:outline-none"><FaArrowLeft /> Back</button>
          <h1 className="text-3xl font-bold text-blue-900">Applicants</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {applicants.length > 0 ? applicants.map((applicant, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-4 items-center border border-blue-100 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: idx * 0.08 }}
              >
                <FaUserCircle className="text-indigo-400 text-6xl mb-2" />
                <h2 className="text-xl font-bold text-blue-900 mb-1">{applicant.name}</h2>
                <div className="flex items-center gap-2 text-gray-600"><FaEnvelope /> {applicant.email}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaPhone /> {applicant.phone}</div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleInterviewReferral(applicant.name)}
                    className="px-5 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-2"
                  >
                    <FaCheckCircle /> Refer for Interview
                  </button>
                  <button
                    onClick={() => viewCv(applicant.cv)}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                  >
                    <FaFilePdf /> View CV
                  </button>
                </div>
              </motion.div>
            )) : (
              <motion.div className="col-span-full text-center text-gray-500 py-12 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No applicants available.</motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* CV Modal */}
      <AnimatePresence>
        {cvUrl && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeCvModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FaFilePdf /> Applicant CV</h2>
              <div className="mb-4">
                <iframe
                  src={cvUrl}
                  title="CV"
                  width="100%"
                  height="500px"
                  className="border border-gray-300 rounded-lg"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicantsPage;