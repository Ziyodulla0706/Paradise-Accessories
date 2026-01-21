'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-floating w-16 h-16 bg-gold-800 hover:bg-gold-900 text-white rounded-full shadow-gold flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </motion.button>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-modal"
            />
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 400, scale: 0.8 }}
              className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-navy-900 rounded-xl shadow-2xl z-modal overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gold-800 text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Talk to Label Expert</h3>
                  <p className="text-xs text-gold-100">Typically replies in 5 minutes</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gold-200"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                  <div className="w-10 h-10 bg-gold-800 rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hi! I'm Sarah, your label specialist. I can help you choose the right product
                      and provide instant quotes.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg text-sm transition-colors">
                    What's the price for 1000 woven labels?
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg text-sm transition-colors">
                    Can you match my existing labels?
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg text-sm transition-colors">
                    Do you have rush production?
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-navy-700">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
