import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [OpportunityType, setOpportunityType] = useState(''); // إضافة فلتر نوع الفرصة
  const jordanGovernorates = [
    "Amman", "Zarqa", "Irbid", "Mafraq", "Aqaba", "Madaba", "Karak", "Tafilah",
    , "Balqa", "Jerash", "Ma'an"
  ];
  const handleSearch = () => {
    onSearch({
      query,
      jobType,
      location,
      OpportunityType, // تمرير نوع الفرصة
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 p-6 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search for job title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Location</option>
        {jordanGovernorates.map((governorate, index) => (
          <option key={index} value={governorate}>
            {governorate}
          </option>
        ))}
      </select>
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select job type</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
      </select>
      <select
        value={OpportunityType}
        onChange={(e) => setOpportunityType(e.target.value)}
        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select opportunity type</option>
        <option value="job">Job</option>
        <option value="internship">Internship</option>
      </select>
      <button
        onClick={handleSearch}
        className="w-full sm:w-1/4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
