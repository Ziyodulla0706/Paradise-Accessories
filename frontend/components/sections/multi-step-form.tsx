'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Step = 'product' | 'project' | 'contact' | 'review';

const productTypes = [
  {
    key: 'woven',
    icon: '🧵',
    label: 'Woven Labels',
    badge: 'Most Popular',
  },
  {
    key: 'printed',
    icon: '🖨️',
    label: 'Printed Labels',
  },
  {
    key: 'hangTags',
    icon: '🏷️',
    label: 'Hang Tags',
  },
  {
    key: 'embroidery',
    icon: '✨',
    label: 'Embroidered Patches',
  },
  {
    key: 'careLabels',
    icon: '📋',
    label: 'Care Labels',
  },
  {
    key: 'custom',
    icon: '🎨',
    label: 'Custom Solution',
  },
];

export function MultiStepForm() {
  const t = useTranslations('contact');
  const [step, setStep] = useState<Step>('product');
  const [formData, setFormData] = useState({
    productType: '',
    quantity: '',
    size: '',
    colors: '',
    deadline: '',
    file: null as File | null,
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: API integration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 1500);
  };

  const canProceed = () => {
    switch (step) {
      case 'product':
        return formData.productType !== '';
      case 'project':
        return formData.quantity !== '' && formData.deadline !== '';
      case 'contact':
        return formData.name !== '' && formData.email !== '' && formData.phone !== '';
      default:
        return true;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-navy-950 dark:to-navy-900">
      <div className="container-dense">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-950 dark:text-gray-50 mb-2">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get a detailed quote in 3 simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {(['product', 'project', 'contact', 'review'] as Step[]).map((s, index) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step === s
                        ? 'bg-gold-800 text-white scale-110'
                        : ['product', 'project', 'contact', 'review'].indexOf(step) > index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-navy-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {['product', 'project', 'contact', 'review'].indexOf(step) > index ? (
                      '✓'
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                    {s === 'product' ? 'Product' : s === 'project' ? 'Project' : s === 'contact' ? 'Contact' : 'Review'}
                  </div>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      ['product', 'project', 'contact', 'review'].indexOf(step) > index
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-navy-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-xl border border-gray-200 dark:border-navy-700 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 'product' && (
                <motion.div
                  key="product"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50 mb-4">
                    Step 1: What do you need?
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productTypes.map((product) => (
                      <button
                        key={product.key}
                        onClick={() => setFormData({ ...formData, productType: product.key })}
                        className={`p-6 rounded-lg border-2 text-left transition-all ${
                          formData.productType === product.key
                            ? 'border-gold-800 bg-gold-50 dark:bg-gold-900/20 shadow-md'
                            : 'border-gray-200 dark:border-navy-700 hover:border-gold-600'
                        }`}
                      >
                        <div className="text-4xl mb-2">{product.icon}</div>
                        <div className="font-semibold text-navy-950 dark:text-gray-50 mb-1">
                          {product.label}
                        </div>
                        {product.badge && (
                          <span className="text-xs bg-gold-800 text-white px-2 py-1 rounded">
                            {product.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('project')}
                    disabled={!canProceed()}
                    className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    Next: Project Details
                  </button>
                </motion.div>
              )}

              {step === 'project' && (
                <motion.div
                  key="project"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50">
                      Step 2: Tell us about your project
                    </h3>
                    <button
                      onClick={() => setStep('product')}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-navy-950 dark:hover:text-gray-50"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        min="500"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 5000"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="e.g. 50mm x 30mm"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Colors
                      </label>
                      <input
                        type="text"
                        value={formData.colors}
                        onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                        placeholder="e.g. 3 colors"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deadline *
                      </label>
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Design Files (optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-navy-700 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept=".pdf,.ai,.eps,.png,.jpg"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-gold-800 hover:text-gold-900 font-medium"
                      >
                        Click to upload or drag and drop
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        PDF, AI, EPS, PNG up to 10MB
                      </p>
                      {formData.file && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          ✓ {formData.file.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('contact')}
                    disabled={!canProceed()}
                    className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    Next: Contact Information
                  </button>
                </motion.div>
              )}

              {step === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50">
                      Step 3: How can we reach you?
                    </h3>
                    <button
                      onClick={() => setStep('project')}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-navy-950 dark:hover:text-gray-50"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('review')}
                    disabled={!canProceed()}
                    className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    Review & Submit
                  </button>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50">
                      Step 4: Review and Submit
                    </h3>
                    <button
                      onClick={() => setStep('contact')}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-navy-950 dark:hover:text-gray-50"
                    >
                      ← Edit
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-6 space-y-4">
                    <div>
                      <strong className="text-navy-950 dark:text-gray-50">Product:</strong>{' '}
                      <span className="text-gray-700 dark:text-gray-300">
                        {productTypes.find((p) => p.key === formData.productType)?.label}
                      </span>
                    </div>
                    <div>
                      <strong className="text-navy-950 dark:text-gray-50">Quantity:</strong>{' '}
                      <span className="text-gray-700 dark:text-gray-300">{formData.quantity}</span>
                    </div>
                    {formData.size && (
                      <div>
                        <strong className="text-navy-950 dark:text-gray-50">Size:</strong>{' '}
                        <span className="text-gray-700 dark:text-gray-300">{formData.size}</span>
                      </div>
                    )}
                    <div>
                      <strong className="text-navy-950 dark:text-gray-50">Contact:</strong>{' '}
                      <span className="text-gray-700 dark:text-gray-300">
                        {formData.name} ({formData.email})
                      </span>
                    </div>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">✓</div>
                      <h4 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
                        Thank you!
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        We'll send you a detailed quote within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
