'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const advantages = [
  {
    key: 'quality',
    icon: '✨',
  },
  {
    key: 'speed',
    icon: '⚡',
  },
  {
    key: 'design',
    icon: '🎨',
  },
  {
    key: 'experience',
    icon: '🏆',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function Advantages() {
  const t = useTranslations('advantages');

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50 dark:from-navy-900 dark:to-navy-950">
      <div className="container-dense">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-950 dark:text-gray-50 mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Why choose Paradise Accessories for your labeling needs
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-tight"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.key}
              variants={cardVariants}
              className="p-6 rounded-xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 hover:border-gold-800 dark:hover:border-gold-800 transition-all group shadow-sm hover:shadow-lg"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold font-heading text-navy-950 dark:text-gray-50 mb-2">
                {t(`items.${advantage.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t(`items.${advantage.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
