import React, { useState } from "react";

const JobDescriptionForm = ({ data, setData, onNext, onBack }) => {
  const [desc, setDesc] = useState(data || "");

  const handleNext = (e) => {
    e.preventDefault();
    setData(desc);
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleNext}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Paste the Job Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" rows={7} placeholder="Paste the job description here..." />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
        <button type="submit" className="ml-auto py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
      </div>
    </form>
  );
};

export default JobDescriptionForm; 