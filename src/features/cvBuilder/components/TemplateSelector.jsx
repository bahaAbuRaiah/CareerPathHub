import React from "react";

const templates = [
  { id: "template1", name: "Classic ATS" },
  { id: "template2", name: "Modern Minimal" },
  { id: "template3", name: "Professional" }
];

const TemplateSelector = ({ selected, setSelected }) => (
  <div>
    <h3 className="text-md font-semibold text-gray-700 mb-2">Choose a CV Template</h3>
    <div className="flex gap-3">
      {templates.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => setSelected(t.id)}
          className={`flex-1 px-4 py-3 rounded-xl border-2 font-semibold transition text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
            ${selected === t.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg' : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300'}`}
        >
          {t.name}
        </button>
      ))}
    </div>
  </div>
);

export default TemplateSelector; 