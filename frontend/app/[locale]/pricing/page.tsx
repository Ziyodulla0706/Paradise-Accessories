'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const factors = [
  { key: 'quantity', icon: '📊' },
  { key: 'material', icon: '🧵' },
  { key: 'design', icon: '🎨' },
  { key: 'urgency', icon: '⏰' },
];

export default function PricingPage() {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');

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
              <p className="text-xl text-text-secondary dark:text-dark-text-secondary mb-4">
                {t('subtitle')}
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {t('note')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Factors Section */}
        <section className="py-20 bg-white dark:bg-dark-bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-4">
                {t('factors.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {factors.map((factor, index) => (
                <motion.div
                  key={factor.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-bg-light dark:bg-dark-bg-tertiary border border-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {factor.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-graphite dark:text-dark-text-primary mb-2">
                    {t(`factors.items.${factor.key}.title`)}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    {t(`factors.items.${factor.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-bg-light dark:bg-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center bg-white dark:bg-dark-bg-tertiary rounded-xl p-12 shadow-lg border border-border dark:border-dark-border"
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
                {t('requestQuote')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
