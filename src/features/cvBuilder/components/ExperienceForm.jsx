import React, { useState } from "react";

const emptyExp = { title: "", company: "", location: "", start: "", end: "", description: "" };

const ExperienceForm = ({ data, setData, onNext, onBack }) => {
  const [entries, setEntries] = useState(data.length ? data : [emptyExp]);

  const handleChange = (idx, e) => {
    const updated = entries.map((ex, i) => i === idx ? { ...ex, [e.target.name]: e.target.value } : ex);
    setEntries(updated);
  };

  const addEntry = () => setEntries([...entries, emptyExp]);
  const removeEntry = (idx) => setEntries(entries.filter((_, i) => i !== idx));

  const handleNext = (e) => {
    e.preventDefault();
    setData(entries);
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleNext}>
      {entries.map((ex, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-2 bg-gray-50 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input name="title" value={ex.title} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input name="company" value={ex.company} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input name="location" value={ex.location} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input name="start" type="month" value={ex.start} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input name="end" type="month" value={ex.end} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={ex.description} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" rows={2} />
            </div>
          </div>
          {entries.length > 1 && <button type="button" onClick={() => removeEntry(idx)} className="absolute top-2 right-2 text-xs text-red-500">Remove</button>}
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" onClick={addEntry} className="py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition">Add Experience</button>
        <button type="button" onClick={onBack} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
        <button type="submit" className="ml-auto py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
      </div>
    </form>
  );
};

export default ExperienceForm; 