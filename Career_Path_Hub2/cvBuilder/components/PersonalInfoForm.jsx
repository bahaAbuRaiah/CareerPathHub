import React, { useState } from "react";

const PersonalInfoForm = ({ data, setData, onNext }) => {
  const [local, setLocal] = useState(data || {});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!local.name) errs.name = "Name is required";
    if (!local.email) errs.email = "Email is required";
    if (!local.phone) errs.phone = "Phone is required";
    return errs;
  };

  const handleChange = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setData(local);
      onNext();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleNext}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input name="name" value={local.name || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" />
        {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input name="email" value={local.email || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" />
        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input name="phone" value={local.phone || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" />
        {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input name="address" value={local.address || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input name="linkedin" value={local.linkedin || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
        <textarea name="summary" value={local.summary || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400" rows={3} />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
    </form>
  );
};

export default PersonalInfoForm; 