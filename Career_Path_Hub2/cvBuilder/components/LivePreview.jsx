import React from "react";

const LivePreview = ({ formData, template }) => {
  const { personal, education, experience, skills, certifications } = formData;

  // For now, just a simple clean layout
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 min-h-[600px]">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-blue-900">{personal?.name || "Your Name"}</h1>
        <div className="text-gray-600 text-sm mt-1">{personal?.email} | {personal?.phone} | {personal?.address}</div>
        {personal?.linkedin && <div className="text-blue-700 text-xs mt-1">{personal.linkedin}</div>}
        {personal?.summary && <div className="mt-2 text-gray-700 text-sm italic">{personal.summary}</div>}
      </div>
      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Education</h2>
          <ul className="space-y-1">
            {education.map((ed, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-bold">{ed.degree}</span> in {ed.field}, {ed.school} <span className="text-gray-500">({ed.start} - {ed.end})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Experience</h2>
          <ul className="space-y-1">
            {experience.map((ex, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-bold">{ex.title}</span>, {ex.company} ({ex.start} - {ex.end})<br />
                <span className="text-gray-600">{ex.location}</span>
                {ex.description && <div className="text-gray-700 mt-1">{ex.description}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{s}</span>
            ))}
          </div>
        </div>
      )}
      {/* Certifications */}
      {certifications?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Certifications</h2>
          <ul className="space-y-1">
            {certifications.map((c, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-bold">{c.name}</span> - {c.issuer} <span className="text-gray-500">({c.date})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Template name for demo */}
      <div className="text-xs text-gray-400 text-right mt-8">Template: {template}</div>
    </div>
  );
};

export default LivePreview; 