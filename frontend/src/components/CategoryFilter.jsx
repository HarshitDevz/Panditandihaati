import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories = [], selected = 'All', onSelect }) {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="inline-flex gap-3 flex-wrap">
        {['All', ...categories].map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onSelect(cat)}
            whileHover={{ scale: 1.04 }}
            className={`px-4 py-2 rounded-full font-medium transition ${selected === cat ? 'bg-[#ff9800] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-700'}`}>
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
