'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SpecificationsTable } from '@/components/sections/specifications-table';
import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image'; // TODO: Раскомментировать после добавления изображений

const categories = [
  { key: 'all', label: 'filter.all' },
  { key: 'woven', label: 'categories.woven' },
  { key: 'printed', label: 'categories.printed' },
  { key: 'hangTags', label: 'categories.hangTags' },
  { key: 'stickers', label: 'categories.stickers' },
  { key: 'packaging', label: 'categories.packaging' },
];

// Mock data - будет заменено на данные из API
const mockProducts = [
  {
    id: 1,
    name: 'Вшивные этикетки премиум',
    category: 'woven',
    image: '/images/hang_tag_product_1768222887414.png',
    description: 'Высококачественные вшивные этикетки с индивидуальным дизайном',
  },
  {
    id: 2,
    name: 'Печатные этикетки',
    category: 'printed',
    image: '/images/woven_label_detail_1768222872246.png',
    description: 'Печатные этикетки с высокой точностью печати',
  },
  {
    id: 3,
    name: 'Навесные бирки',
    category: 'hangTags',
    image: '/images/hang_tag_product_1768222887414.png',
    description: 'Стильные навесные бирки для вашего бренда',
  },
];

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? mockProducts
      : mockProducts.filter((p) => p.category === selectedCategory);

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

        {/* Products Grid */}
        <section className="py-20 bg-bg-light dark:bg-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-dark-bg-tertiary rounded-xl overflow-hidden shadow-lg border border-border dark:border-dark-border hover:shadow-xl transition-all group"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-accent/10 to-accent-light/10 flex items-center justify-center">
                        <span className="text-5xl">🏷️</span>
                        {/* TODO: Заменить на реальное изображение */}
                        {/* <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        /> */}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-graphite dark:text-dark-text-primary mb-2">
                          {product.name}
                        </h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                          {product.description}
                        </p>
                        <button className="w-full px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors">
                          {t('viewDetails')}
                        </button>
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
                    {t('noProducts')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Specifications Table */}
        <SpecificationsTable />
      </main>
      <Footer />
    </>
  );
}
