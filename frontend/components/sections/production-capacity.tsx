'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ProductionCapacity() {
  const [capacity, setCapacity] = useState(85);

  useEffect(() => {
    // Simulate capacity updates
    const interval = setInterval(() => {
      setCapacity((prev) => {
        const change = Math.random() * 4 - 2; // -2 to +2
        return Math.max(60, Math.min(95, prev + change));
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (capacity < 70) return 'bg-green-500';
    if (capacity < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-navy-900/90 rounded-lg border border-gray-200 dark:border-navy-700 backdrop-blur-sm min-w-[180px]">
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs mb-0.5">
          <span className="text-gray-600 dark:text-gray-400">Production Capacity</span>
          <span className="font-semibold text-navy-900 dark:text-gray-50">{Math.round(capacity)}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-navy-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${capacity}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      <div
        className="group relative cursor-help flex-shrink-0"
        title="Based on current orders, we can accept new projects for delivery within 7 days"
      >
        <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
