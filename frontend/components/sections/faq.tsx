'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const t = useTranslations('faq');
  const tQuestions = useTranslations('faq.questions');
  
  const faqs: FAQItem[] = [
    {
      question: tQuestions('productionCapacity.question'),
      answer: tQuestions('productionCapacity.answer'),
    },
    {
      question: tQuestions('rushOrders.question'),
      answer: tQuestions('rushOrders.answer'),
    },
    {
      question: tQuestions('fileFormats.question'),
      answer: tQuestions('fileFormats.answer'),
    },
    {
      question: tQuestions('pantoneColors.question'),
      answer: tQuestions('pantoneColors.answer'),
    },
    {
      question: tQuestions('defectPolicy.question'),
      answer: tQuestions('defectPolicy.answer'),
    },
    {
      question: tQuestions('internationalShipping.question'),
      answer: tQuestions('internationalShipping.answer'),
    },
    {
      question: tQuestions('moq.question'),
      answer: tQuestions('moq.answer'),
    },
    {
      question: tQuestions('samples.question'),
      answer: tQuestions('samples.answer'),
    },
  ];
  
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white dark:bg-navy-900">
      <div className="container-dense">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-950 dark:text-gray-50 mb-2">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 dark:border-navy-700 rounded-lg overflow-hidden bg-white dark:bg-navy-800"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                >
                  <span className="font-semibold text-navy-950 dark:text-gray-50 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-gold-800"
                  >
                    ▼
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-navy-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
