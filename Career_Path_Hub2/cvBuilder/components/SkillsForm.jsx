import React, { useState } from "react";

const SkillsForm = ({ data, setData, onNext, onBack }) => {
  const [skills, setSkills] = useState(data.length ? data : [""]);
  const [input, setInput] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };
  const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

  const handleNext = (e) => {
    e.preventDefault();
    setData(skills.filter(Boolean));
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleNext}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Add Skill</label>
        <div className="flex gap-2 mt-1">
          <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 rounded-lg border px-3 py-2" placeholder="e.g. JavaScript" />
          <button onClick={addSkill} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">Add</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2">
            {skill}
            <button type="button" onClick={() => removeSkill(idx)} className="ml-1 text-xs text-red-500">&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
        <button type="submit" className="ml-auto py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
      </div>
    </form>
  );
};

export default SkillsForm; 