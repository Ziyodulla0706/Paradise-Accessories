'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactForm() {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tTypes = useTranslations('contact.productTypes');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    productType: '',
    quantity: '',
    message: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const productTypes = [
    { value: 'woven', label: tTypes('woven') },
    { value: 'printed', label: tTypes('printed') },
    { value: 'hangTags', label: tTypes('hangTags') },
    { value: 'stickers', label: tTypes('stickers') },
    { value: 'other', label: tTypes('other') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Integrate with Django API
    // For now, simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        productType: '',
        quantity: '',
        message: '',
        file: null,
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-bg-light dark:bg-dark-bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-dark-text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-dark-bg-secondary rounded-xl p-8 shadow-lg border border-border dark:border-dark-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('company')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('phone')} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('productType')} *
                </label>
                <select
                  required
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">{tForm('productType')}</option>
                  {productTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  {tForm('quantity')}
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                {tForm('message')}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                {tForm('file')}
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
              >
                {tForm('success')}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
              >
                {tForm('error')}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-all shadow-accent disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? 'Отправка...' : tForm('submit')}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
