import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';

const QuestionStepper = ({
  questions,
  answers,
  options,
  onChange,
  onNext,
  onPrev,
  onSubmit,
  currentPart,
  totalParts,
  error,
  isLastStep,
}) => {
  return (
    <form
      onSubmit={isLastStep ? onSubmit : (e) => { e.preventDefault(); onNext(); }}
      className="space-y-8"
      autoComplete="off"
    >
      <AnimatePresence mode="wait">
        {questions.map((q, idx) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 mb-4 border border-blue-100"
          >
            <p className="mb-4 text-lg font-semibold text-gray-800">{idx + 1}. {q.text}</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors border-2 ${answers[q.name] === opt.value ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}
                >
                  <input
                    type="radio"
                    name={q.name}
                    value={opt.value}
                    checked={answers[q.name] === opt.value}
                    onChange={() => onChange(q.name, opt.value)}
                    className="form-radio h-5 w-5 text-blue-600 mr-2"
                    required
                    aria-checked={answers[q.name] === opt.value}
                  />
                  <span className="text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
            {error && <div className="mt-2 text-red-600 text-sm font-medium animate-pulse">{error}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentPart === 0}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 flex items-center gap-2"
        >
          <FaChevronLeft /> Previous
        </button>
        {isLastStep ? (
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 flex items-center gap-2 shadow-md"
          >
            <FaCheck /> Finish
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-2 shadow-md"
          >
            Next <FaChevronRight />
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionStepper; 