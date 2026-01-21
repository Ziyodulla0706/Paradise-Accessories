'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiveIndicatorProps {
  label: string;
  value: string | number;
  variant?: 'success' | 'warning' | 'info';
  pulse?: boolean;
}

export function LiveIndicator({ label, value, variant = 'info', pulse = true }: LiveIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  const variantStyles = {
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
    >
      {pulse && (
        <motion.span
          className="w-2 h-2 rounded-full bg-white"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <span>{label}:</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  );
}
