'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { StatCounter } from '@/components/ui/stat-counter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function HeroDense() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden pt-20">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-fabric-texture" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gold-800 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-dense py-12 md:py-20 relative z-10 mt-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-gold-800/20 border border-gold-800 rounded-full text-sm font-medium mb-4"
            >
              Premium Labels & Embroidery That Elevate Your Brand
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-4 text-lg"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-semibold">500+</span>
                <span className="text-gray-300">MOQ</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-semibold">7-Day</span>
                <span className="text-gray-300">Production</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-semibold">99.8%</span>
                <span className="text-gray-300">Quality Rate</span>
              </div>
            </motion.div>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>

            {/* Trust indicators inline */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-gold-400">
                  <StatCounter value={15} suffix="+" />
                </div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-gold-400">
                  <StatCounter value={10000} suffix="+" />
                </div>
                <div className="text-sm text-gray-300">Brands Served</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-gold-400">
                  <StatCounter value={500} suffix="M+" decimals={0} />
                </div>
                <div className="text-sm text-gray-300">Labels Produced</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">ISO 9001 Certified</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <Link
                href="/contacts"
                className="px-8 py-4 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-semibold text-center transition-all shadow-gold hover:shadow-lg transform hover:scale-105"
              >
                Get Free Samples
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-lg font-semibold text-center transition-all backdrop-blur-sm"
              >
                Calculate Price
              </Link>
            </motion.div>

          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gold-800/20 to-gold-600/10 border border-gold-800/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl">🏷️</span>
              </div>
              {/* Placeholder for 3D product showcase */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
