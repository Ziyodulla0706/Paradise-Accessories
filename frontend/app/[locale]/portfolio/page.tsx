'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image'; // TODO: Раскомментировать после добавления изображений

const categories = [
  { key: 'all', label: 'filter.all' },
  { key: 'woven', label: 'filter.woven' },
  { key: 'printed', label: 'filter.printed' },
  { key: 'hangTags', label: 'filter.hangTags' },
  { key: 'stickers', label: 'filter.stickers' },
  { key: 'packaging', label: 'filter.packaging' },
];

// Mock data - будет заменено на данные из API
const mockPortfolio = [
  {
    id: 1,
    title: 'Вшивные этикетки для бренда X',
    category: 'woven',
    image: '/images/woven_label_detail_1768222872246.png',
    description: 'Премиальные вшивные этикетки с индивидуальным дизайном',
  },
  {
    id: 2,
    title: 'Печатные этикетки для коллекции Y',
    category: 'printed',
    image: '/images/leather_patch_detail_1768222905280.png',
    description: 'Высококачественная печать на премиальных материалах',
  },
  {
    id: 3,
    title: 'Навесные бирки премиум класса',
    category: 'hangTags',
    image: '/images/hang_tag_product_1768222887414.png',
    description: 'Стильные бирки с уникальным дизайном',
  },
];

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof mockPortfolio[0] | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? mockPortfolio
      : mockPortfolio.filter((item) => item.category === selectedCategory);

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
              <p className="text-xl text-text-secondary dark:text-dark-text-secondary">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white dark:bg-dark-bg-primary border-b border-border dark:border-dark-border sticky top-20 z-sticky backdrop-blur-sm bg-white/80 dark:bg-dark-bg-primary/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.key
                      ? 'bg-accent text-white shadow-accent'
                      : 'bg-bg-light dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-dark dark:hover:bg-dark-bg-tertiary'
                  }`}
                >
                  {t(category.label)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-bg-light dark:bg-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {filteredItems.length > 0 ? (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-dark-bg-tertiary rounded-xl overflow-hidden shadow-lg border border-border dark:border-dark-border hover:shadow-xl transition-all cursor-pointer group"
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-accent/10 to-accent-light/10 flex items-center justify-center">
                        <span className="text-5xl">🏷️</span>
                        {/* TODO: Заменить на реальное изображение */}
                        {/* <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        /> */}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-graphite dark:text-dark-text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-xl text-text-secondary dark:text-dark-text-secondary">
                    {t('noItems')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-modal flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-dark-bg-secondary rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-96 bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center">
                  <span className="text-8xl">🏷️</span>
                  {/* TODO: Заменить на реальное изображение */}
                  {/* <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  /> */}
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-navy-950 dark:text-gray-50 mb-4">
                        {selectedItem.title}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {selectedItem.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Category:</span>
                          <span className="font-semibold text-navy-950 dark:text-gray-50">{selectedItem.category}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Production Time:</span>
                          <span className="font-semibold text-navy-950 dark:text-gray-50">7-10 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                          <span className="font-semibold text-navy-950 dark:text-gray-50">5,000+ pieces</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-6">
                      <h3 className="font-semibold text-navy-950 dark:text-gray-50 mb-3">Client Testimonial</h3>
                      <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                        "Excellent quality and service. The labels exceeded our expectations and the turnaround time was impressive."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-800 rounded-full flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <div className="font-semibold text-navy-950 dark:text-gray-50">John Doe</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Brand Director, Fashion Co.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-3 border-2 border-navy-950 dark:border-gray-300 text-navy-950 dark:text-gray-50 rounded-lg font-medium transition-colors hover:bg-gray-50 dark:hover:bg-navy-800"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-3 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-medium transition-colors"
                    >
                      Request Similar Solution
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
