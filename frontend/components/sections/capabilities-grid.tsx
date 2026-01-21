'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const capabilities = [
  {
    key: 'woven',
    icon: '🧵',
    title: 'Woven Labels',
    price: 'From $0.15/piece',
    features: ['Up to 12 colors', 'Premium materials', 'Custom sizes'],
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    key: 'printed',
    icon: '🖨️',
    title: 'Printed Labels',
    price: 'From $0.08/piece',
    features: ['Unlimited colors', 'High resolution', 'Quick turnaround'],
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    key: 'embroidery',
    icon: '✨',
    title: 'Embroidered Patches',
    price: 'From $1.50/piece',
    features: ['3D effects', 'Metallic thread', 'Custom shapes'],
    gradient: 'from-green-600 to-green-800',
  },
  {
    key: 'hangTags',
    icon: '🏷️',
    title: 'Hang Tags',
    price: 'From $0.20/piece',
    features: ['Cardboard/plastic', 'Custom printing', 'Strings included'],
    gradient: 'from-orange-600 to-orange-800',
  },
  {
    key: 'careLabels',
    icon: '📋',
    title: 'Care Labels',
    price: 'From $0.05/piece',
    features: ['Wash instructions', 'Material info', 'Multiple languages'],
    gradient: 'from-red-600 to-red-800',
  },
  {
    key: 'custom',
    icon: '🎨',
    title: 'Custom Solutions',
    price: 'Contact us',
    features: ['Unique designs', 'Special materials', 'Volume discounts'],
    gradient: 'from-indigo-600 to-indigo-800',
  },
];

export function CapabilitiesGrid() {
  const t = useTranslations('catalog');

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
            Our Capabilities
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete range of labeling solutions for your brand
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
                  View 50+ Examples
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
