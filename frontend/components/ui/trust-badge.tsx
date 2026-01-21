'use client';

import { motion } from 'framer-motion';

interface TrustBadgeProps {
  icon: string;
  title: string;
  description?: string;
  link?: string;
  className?: string;
}

export function TrustBadge({ icon, title, description, link, className = '' }: TrustBadgeProps) {
  const content = (
    <motion.div
      className={`p-4 rounded-lg bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 hover:border-gold-800 dark:hover:border-gold-800 transition-all group ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-navy-900 dark:text-gray-50 text-sm">{title}</h4>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
