import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // استيراد axios لجلب البيانات من API

const JobInformation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/api/Job/GetByID?ID=${id}`); // استبدال URL بـ API الفعلي
        setJob(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Job not found. Please try again.');
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Loading job details...</div>; // عرض حالة التحميل
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        <p>{error}</p>
        <button
          onClick={() => navigate('/')} // العودة إلى الصفحة الرئيسية
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Go back to job listings
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-lg text-gray-600">{job.companyName} - {job.location}</p>
      <p className="text-sm text-gray-500">
        {job.OpportunityType === 'job' ? 'Job Opportunity' : 'Internship Opportunity'}
      </p>

      <div className="mt-4">
        <h3 className="text-xl font-medium text-gray-800">Job Requirements:</h3>
        <ul className="list-disc list-inside">
          {job.requirements && job.requirements.length > 0 ? (
            job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))
          ) : (
            <li className="text-gray-700">No specific requirements listed.</li>
          )}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-medium text-gray-800">Job Responsibilities:</h3>
        <ul className="list-disc list-inside">
          {job.responsibilities && job.responsibilities.length > 0 ? (
            job.responsibilities.map((resp, index) => (
              <li key={index} className="text-gray-700">{resp}</li>
            ))
          ) : (
            <li className="text-gray-700">No specific responsibilities listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JobInformation;
