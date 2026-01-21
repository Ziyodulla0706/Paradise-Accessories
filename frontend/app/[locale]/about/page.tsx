'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

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

export default function AboutPage() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');

  const values = [
    { key: 'quality', icon: '✨' },
    { key: 'innovation', icon: '🚀' },
    { key: 'partnership', icon: '🤝' },
    { key: 'reliability', icon: '✅' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-bg-light to-white dark:from-dark-bg-primary dark:to-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-graphite dark:text-dark-text-primary mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-text-secondary dark:text-dark-text-secondary mb-8">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 bg-white dark:bg-dark-bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-6">
                  {t('history.title')}
                </h2>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {t('history.text')}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-6">
                  {t('mission.title')}
                </h2>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {t('mission.text')}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-bg-light dark:bg-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-4">
                {t('values.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-dark-bg-tertiary border border-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-graphite dark:text-dark-text-primary mb-2">
                    {t(`values.items.${value.key}.title`)}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    {t(`values.items.${value.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white dark:bg-dark-bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8">
                {t('cta.subtitle')}
              </p>
              <Link
                href="/contacts"
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-all shadow-accent hover:shadow-lg transform hover:scale-105"
              >
                {tCommon('getQuote')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
