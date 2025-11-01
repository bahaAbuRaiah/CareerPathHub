import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ percent, step, totalSteps }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-blue-700 font-semibold">Step {step} of {totalSteps}</span>
      <span className="text-sm text-blue-700 font-semibold">{Math.round(percent)}%</span>
    </div>
    <div className="w-full bg-blue-100 rounded-full h-3 shadow-inner">
      <motion.div
        className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.5 }}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  </div>
);

export default ProgressBar; 