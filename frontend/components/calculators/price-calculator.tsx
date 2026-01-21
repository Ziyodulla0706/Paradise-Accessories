'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type ProductType = 'woven' | 'printed' | 'hangTags' | 'embroidery';
type Step = 'type' | 'specs' | 'quantity' | 'result';

const quantityBreaks = [
  { min: 500, max: 999, discount: 0 },
  { min: 1000, max: 2499, discount: 0.05 },
  { min: 2500, max: 4999, discount: 0.10 },
  { min: 5000, max: 9999, discount: 0.15 },
  { min: 10000, max: 24999, discount: 0.20 },
  { min: 25000, max: Infinity, discount: 0.25 },
];

export function PriceCalculator() {
  const t = useTranslations('calculator');
  const tTypes = useTranslations('contact.productTypes');
  
  const productTypes = [
    { key: 'woven' as ProductType, label: tTypes('woven'), icon: '🧵', basePrice: 0.15 },
    { key: 'printed' as ProductType, label: tTypes('printed'), icon: '🖨️', basePrice: 0.08 },
    { key: 'hangTags' as ProductType, label: tTypes('hangTags'), icon: '🏷️', basePrice: 0.20 },
    { key: 'embroidery' as ProductType, label: tTypes('embroidery'), icon: '✨', basePrice: 1.50 },
  ];
  
  const [step, setStep] = useState<Step>('type');
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1000);
  const [showEmail, setShowEmail] = useState(false);

  const basePrice = productType ? productTypes.find((p) => p.key === productType)?.basePrice || 0 : 0;
  const discountTier = quantityBreaks.find((tier) => quantity >= tier.min && quantity <= tier.max);
  const discount = discountTier?.discount || 0;
  const unitPrice = basePrice * (1 - discount);
  const subtotal = unitPrice * quantity;
  const setupFee = quantity < 5000 ? 50 : 0;
  const total = subtotal + setupFee;
  const savings = subtotal * discount;

  const handleNext = () => {
    if (step === 'type' && productType) {
      setStep('quantity');
    } else if (step === 'quantity') {
      setStep('result');
    }
  };

  const handleBack = () => {
    if (step === 'quantity') {
      setStep('type');
    } else if (step === 'result') {
      setStep('quantity');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-navy-950 dark:to-navy-900">
      <div className="container-dense">
        <div className="max-w-4xl mx-auto">
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

          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-xl border border-gray-200 dark:border-navy-700 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 dark:bg-navy-700">
              <motion.div
                className="h-full bg-gold-800"
                initial={{ width: '0%' }}
                animate={{
                  width:
                    step === 'type'
                      ? '33%'
                      : step === 'quantity'
                      ? '66%'
                      : '100%',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 'type' && (
                  <motion.div
                    key="type"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50 mb-4">
                      {t('step1.title')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {productTypes.map((product) => (
                        <button
                          key={product.key}
                          onClick={() => {
                            setProductType(product.key);
                            setTimeout(() => handleNext(), 300);
                          }}
                          className={`p-6 rounded-lg border-2 transition-all text-left ${
                            productType === product.key
                              ? 'border-gold-800 bg-gold-50 dark:bg-gold-900/20'
                              : 'border-gray-200 dark:border-navy-700 hover:border-gold-600'
                          }`}
                        >
                          <div className="text-4xl mb-3">{product.icon}</div>
                          <div className="font-semibold text-navy-950 dark:text-gray-50 mb-1">
                            {product.label}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('step1.from')} ${product.basePrice}/{t('calculator.perPiece')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 'quantity' && (
                  <motion.div
                    key="quantity"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50">
                        {t('step2.title')}
                      </h3>
                      <button
                        onClick={handleBack}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-navy-950 dark:hover:text-gray-50"
                      >
                        {t('step2.back')}
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          {t('step2.quantity')} <span className="font-bold text-navy-950 dark:text-gray-50">{quantity.toLocaleString()}</span>
                        </label>
                        <input
                          type="range"
                          min="500"
                          max="100000"
                          step="500"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-800"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>500</span>
                          <span>100,000</span>
                        </div>
                      </div>

                      {/* Quantity breaks */}
                      <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('step2.quantityBreaks')}
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                          {quantityBreaks.map((tier, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded ${
                                quantity >= tier.min && quantity <= tier.max
                                  ? 'bg-gold-800 text-white'
                                  : 'bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700'
                              }`}
                            >
                              <div className="font-semibold">
                                {tier.min.toLocaleString()}
                                {tier.max !== Infinity && `-${tier.max.toLocaleString()}`}
                              </div>
                              <div className="text-xs opacity-75">
                                {tier.discount * 100}{t('step2.off')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800 rounded-lg p-4 mb-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {t('step2.estimatedUnitPrice')}
                          </div>
                          <div className="text-2xl font-bold text-gold-800">
                            ${unitPrice.toFixed(3)}
                          </div>
                          {discount > 0 && (
                            <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                              {t('step2.youSave')} ${savings.toFixed(2)} ({discount * 100}{t('step2.discount')})
                            </div>
                          )}
                        </div>

                        <button
                          onClick={handleNext}
                          className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-semibold transition-colors"
                        >
                          {t('step2.calculateTotal')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'result' && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-navy-950 dark:text-gray-50">
                        {t('step3.title')}
                      </h3>
                      <button
                        onClick={handleBack}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-navy-950 dark:hover:text-gray-50"
                      >
                        {t('step3.edit')}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>{t('step3.unitPrice')} ({quantity.toLocaleString()} {t('step3.units')}):</span>
                        <span>${unitPrice.toFixed(3)}/{t('step3.units')}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>{t('step3.subtotal')}</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {setupFee > 0 && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t('step3.setupFee')}</span>
                          <span>${setupFee.toFixed(2)}</span>
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>{t('step3.discount')} ({discount * 100}%):</span>
                          <span>-${savings.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 dark:border-navy-700 pt-4 flex justify-between text-xl font-bold text-navy-950 dark:text-gray-50">
                        <span>{t('step3.total')}</span>
                        <span className="text-gold-800">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {!showEmail ? (
                      <div className="pt-4">
                        <button
                          onClick={() => setShowEmail(true)}
                          className="w-full px-6 py-3 bg-navy-950 dark:bg-navy-800 hover:bg-navy-900 dark:hover:bg-navy-700 text-white rounded-lg font-semibold transition-colors mb-3"
                        >
                          {t('step3.getDetailedQuote')}
                        </button>
                        <div className="flex gap-3">
                          <button className="flex-1 px-6 py-3 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-semibold transition-colors">
                            {t('step3.orderSamples')}
                          </button>
                          <button className="flex-1 px-6 py-3 border-2 border-navy-950 dark:border-gray-300 text-navy-950 dark:text-gray-50 rounded-lg font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-navy-800">
                            {t('step3.speakWithSpecialist')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4"
                      >
                        <input
                          type="email"
                          placeholder={t('step3.enterEmail')}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-800 bg-white dark:bg-navy-950 text-navy-950 dark:text-gray-50"
                        />
                        <button className="w-full px-6 py-3 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-semibold transition-colors">
                          {t('step3.sendQuoteToEmail')}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
