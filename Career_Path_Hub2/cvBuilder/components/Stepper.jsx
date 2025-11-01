import React from "react";
import { motion } from "framer-motion";

const Stepper = ({ steps, currentStep }) => (
  <div className="flex items-center justify-between gap-2">
    {steps.map((step, idx) => (
      <div key={step} className="flex-1 flex flex-col items-center">
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${idx === currentStep ? 'bg-blue-600 scale-110' : 'bg-blue-300'}`}
          animate={{ scale: idx === currentStep ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {idx + 1}
        </motion.div>
        <span className={`mt-2 text-xs font-medium ${idx === currentStep ? 'text-blue-700' : 'text-gray-400'}`}>{step}</span>
        {idx < steps.length - 1 && (
          <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-blue-200 my-1" />
        )}
      </div>
    ))}
  </div>
);

export default Stepper; 