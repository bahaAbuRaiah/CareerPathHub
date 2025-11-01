import React from 'react';

const QuestionGroup = ({ questions, answers, options, onChange, partOffset = 0 }) => {
  return (
    <>
      {questions.map((q, idx) => (
        <div className="mb-6" key={q.name}>
          <p className="mb-2 font-medium">{idx + 1 + partOffset}. {q.text}</p>
          <div className="options mt-2 grid grid-cols-5 gap-4">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center">
                <input
                  type="radio"
                  name={q.name}
                  value={opt.value}
                  checked={answers[q.name] === String(opt.value) || answers[q.name] === opt.value}
                  onChange={() => onChange(q.name, opt.value)}
                  className="mr-2"
                  required
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionGroup; 