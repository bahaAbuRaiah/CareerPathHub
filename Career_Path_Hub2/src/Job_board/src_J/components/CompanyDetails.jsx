// src/components/CompanyDetails.jsx
import React from 'react';

const CompanyDetails = ({ company }) => {
  return (
    <div className="p-6 border-t border-gray-200 mt-6">
      <h3 className="text-xl font-medium text-gray-800">About the Company</h3>
      <p className="text-gray-700 mt-2"><strong>Field:</strong> {company.field}</p>
      <p className="text-gray-700 mt-2">
        <strong>Website:</strong> 
        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {company.website}
        </a>
      </p>
      <p className="text-gray-700 mt-2"><strong>Mission:</strong> {company.mission}</p>
    </div>
  );
};

export default CompanyDetails;
