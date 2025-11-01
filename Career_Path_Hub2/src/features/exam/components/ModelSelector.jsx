import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCodeBranch, FaChartLine } from 'react-icons/fa';

const icons = {
  model1: <FaBrain className="text-4xl text-blue-600 mb-3" />,
  model2: <FaCodeBranch className="text-4xl text-blue-600 mb-3" />,
  model3: <FaChartLine className="text-4xl text-blue-600 mb-3" />,
};

const ModelSelector = ({ models, onSelect }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {models.map((model) => (
        <motion.button
          key={model.id}
          onClick={() => onSelect(model.id)}
          className="focus:outline-none group bg-white/70 backdrop-blur-lg rounded-2xl border-2 border-transparent hover:border-blue-500 shadow-xl p-8 flex flex-col items-center transition-all duration-300 focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
          aria-label={model.title}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          {icons[model.id]}
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors">{model.title}</h3>
          <p className="text-sm text-gray-600 text-center">{model.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ModelSelector; 