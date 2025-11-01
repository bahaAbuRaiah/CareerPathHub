import React, { useState } from "react";

const emptyCert = { name: "", issuer: "", date: "" };

const CertificationsForm = ({ data, setData, onNext, onBack }) => {
  const [certs, setCerts] = useState(data.length ? data : [emptyCert]);

  const handleChange = (idx, e) => {
    const updated = certs.map((c, i) => i === idx ? { ...c, [e.target.name]: e.target.value } : c);
    setCerts(updated);
  };
  const addCert = () => setCerts([...certs, emptyCert]);
  const removeCert = (idx) => setCerts(certs.filter((_, i) => i !== idx));

  const handleNext = (e) => {
    e.preventDefault();
    setData(certs);
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleNext}>
      {certs.map((cert, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-2 bg-gray-50 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certification Name</label>
              <input name="name" value={cert.name} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuer</label>
              <input name="issuer" value={cert.issuer} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input name="date" type="month" value={cert.date} onChange={e => handleChange(idx, e)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
          </div>
          {certs.length > 1 && <button type="button" onClick={() => removeCert(idx)} className="absolute top-2 right-2 text-xs text-red-500">Remove</button>}
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" onClick={addCert} className="py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition">Add Certification</button>
        <button type="button" onClick={onBack} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
        <button type="submit" className="ml-auto py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
      </div>
    </form>
  );
};

export default CertificationsForm; 