'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
// import Image from 'next/image'; // TODO: Раскомментировать после добавления изображений

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');

  return (
    <section className="relative min-h-screen flex items-center bg-bg-light dark:bg-dark-bg-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-light rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-graphite dark:text-dark-text-primary mb-6 leading-tight"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link
                href="/contacts"
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold text-center transition-all shadow-accent hover:shadow-lg transform hover:scale-105"
              >
                {t('cta')}
              </Link>
              <a
                href="tel:+998901234567"
                className="px-8 py-4 bg-white dark:bg-dark-bg-secondary border-2 border-accent text-accent dark:text-accent-light rounded-lg font-semibold text-center transition-all hover:bg-accent hover:text-white dark:hover:bg-accent"
              >
                {t('phone')}
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent-light/20 rounded-2xl flex items-center justify-center">
                <span className="text-6xl">🏷️</span>
              </div>
              {/* TODO: Заменить на реальное изображение после копирования в public/images/ */}
              {/* <Image
                src="/images/hero_clothing_label_1768222853423.png"
                alt="Paradise Accessories"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-text-secondary dark:border-dark-text-secondary rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-text-secondary dark:bg-dark-text-secondary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
