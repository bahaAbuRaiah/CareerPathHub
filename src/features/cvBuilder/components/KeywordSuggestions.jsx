import React from "react";

const stopwords = [
  "the", "and", "a", "an", "to", "of", "in", "for", "on", "with", "at", "by", "from", "as", "is", "are", "was", "were", "be", "been", "has", "have", "had", "that", "this", "it", "or", "but", "not", "your", "you", "we", "they", "their", "our", "will", "can", "should", "may", "if", "so", "such"
];

function extractKeywords(text) {
  if (!text) return [];
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopwords.includes(w))
    )
  );
}

const KeywordSuggestions = ({ jobDescription, skills, onBack, onFinish }) => {
  const keywords = extractKeywords(jobDescription);
  const skillSet = new Set((skills || []).map(s => s.toLowerCase()));
  const matched = keywords.filter(k => skillSet.has(k));
  const missing = keywords.filter(k => !skillSet.has(k));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-800">Keyword Suggestions</h2>
      <div>
        <p className="mb-2 text-gray-700">The following keywords were extracted from the job description. Keywords you already have in your skills are <span className="text-green-600 font-semibold">highlighted</span>. Consider adding missing ones if relevant.</p>
        <div className="flex flex-wrap gap-2">
          {keywords.map((k, idx) => (
            <span key={idx} className={`px-3 py-1 rounded-full text-sm font-medium ${skillSet.has(k) ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>{k}</span>
          ))}
        </div>
      </div>
      {missing.length > 0 && (
        <div>
          <h3 className="mt-4 text-md font-semibold text-yellow-700">Missing Keywords</h3>
          <p className="text-sm text-gray-600">Consider adding these to your skills or experience if you have them:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {missing.map((k, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold border border-yellow-300">{k}</span>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2 mt-8">
        <button type="button" onClick={onBack} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
        <button type="button" className="ml-auto py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition" onClick={onFinish}>Finish</button>
      </div>
    </div>
  );
};

export default KeywordSuggestions; 