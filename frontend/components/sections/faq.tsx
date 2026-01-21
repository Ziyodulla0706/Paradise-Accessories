'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's your production capacity?",
    answer:
      'We have a production capacity of 5 million labels per month. Our state-of-the-art facility operates 24/7 with multiple production lines to ensure we can meet both small and large orders efficiently.',
  },
  {
    question: 'Do you offer rush orders?',
    answer:
      'Yes, we offer express production with 3-day turnaround available at a 40% premium. Our standard production time is 7-10 business days, but we can accommodate urgent orders for customers who need faster delivery.',
  },
  {
    question: 'What file formats do you accept?',
    answer:
      'We accept AI (Adobe Illustrator), PDF, EPS, and PNG files with specifications. For best results, we recommend vector formats (AI, EPS, PDF) at 300 DPI or higher. Our design team can also help convert your files if needed.',
  },
  {
    question: 'Can you match Pantone colors exactly?',
    answer:
      'Yes, using our computerized color matching system, we can match Pantone colors accurately to delta E <1.5. We maintain a comprehensive Pantone library and can provide color proofs before production begins.',
  },
  {
    question: "What's your defect replacement policy?",
    answer:
      'We offer 100% replacement for any manufacturing defects found within 90 days of delivery. Our quality control process includes multiple inspection stages, resulting in a 99.8% quality rate. If you find any defects, contact us immediately for replacement.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to 50+ countries worldwide using trusted carriers like DHL and FedEx. All international shipments include full tracking information. Shipping costs and delivery times vary by destination and can be calculated at checkout.',
  },
  {
    question: 'What is your minimum order quantity (MOQ)?',
    answer:
      'Our flexible MOQ starts at just 500 pieces, making us accessible for both small businesses and large enterprises. However, we offer better pricing for larger quantities, with discounts starting at 1,000 pieces.',
  },
  {
    question: 'Can you provide samples before production?',
    answer:
      'Yes, we offer free sample packs for the first 50 requests each month. Samples typically include our most popular materials and finishes so you can feel the quality before placing your order. Samples are shipped within 3-5 business days.',
  },
];

export function FAQ() {
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
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to know about our labels and services
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
