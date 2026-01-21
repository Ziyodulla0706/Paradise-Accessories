'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export function CapabilitiesGrid() {
  const t = useTranslations('capabilities');
  
  const getFeatures = (key: string): string[] => {
    // next-intl doesn't support array access directly, so we'll use raw translations
    const featuresRaw = t.raw(`features.${key}.features`) as string[];
    return featuresRaw || [];
  };
  
  const capabilities = [
    {
      key: 'woven',
      icon: '🧵',
      title: t('features.woven.title'),
      price: t('features.woven.price'),
      features: getFeatures('woven'),
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      key: 'printed',
      icon: '🖨️',
      title: t('features.printed.title'),
      price: t('features.printed.price'),
      features: getFeatures('printed'),
      gradient: 'from-purple-600 to-purple-800',
    },
    {
      key: 'embroidery',
      icon: '✨',
      title: t('features.embroidery.title'),
      price: t('features.embroidery.price'),
      features: getFeatures('embroidery'),
      gradient: 'from-green-600 to-green-800',
    },
    {
      key: 'hangTags',
      icon: '🏷️',
      title: t('features.hangTags.title'),
      price: t('features.hangTags.price'),
      features: getFeatures('hangTags'),
      gradient: 'from-orange-600 to-orange-800',
    },
    {
      key: 'careLabels',
      icon: '📋',
      title: t('features.careLabels.title'),
      price: t('features.careLabels.price'),
      features: getFeatures('careLabels'),
      gradient: 'from-red-600 to-red-800',
    },
    {
      key: 'custom',
      icon: '🎨',
      title: t('features.custom.title'),
      price: t('features.custom.price'),
      features: getFeatures('custom'),
      gradient: 'from-indigo-600 to-indigo-800',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-navy-900">
      <div className="container-dense">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-950 dark:text-gray-50 mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-gradient-to-br bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 hover:border-gold-800 dark:hover:border-gold-800 transition-all cursor-pointer overflow-hidden"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy-950 dark:text-gray-50 mb-2">
                  {capability.title}
                </h3>
                <div className="text-gold-800 dark:text-gold-600 font-bold mb-3">
                  {capability.price}
                </div>
                <ul className="space-y-1.5 mb-4">
                  {capability.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="text-gold-800">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/catalog?category=${capability.key}`}
                  className="text-sm font-medium text-gold-800 dark:text-gold-600 hover:text-gold-900 dark:hover:text-gold-500 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  {t('viewExamples')}
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
