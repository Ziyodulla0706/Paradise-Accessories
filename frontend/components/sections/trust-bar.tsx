'use client';

import { StatCounter } from '@/components/ui/stat-counter';
import { TrustBadge } from '@/components/ui/trust-badge';
import { motion } from 'framer-motion';

export function TrustBar() {
  return (
    <section className="py-6 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 text-white border-y border-navy-800">
      <div className="container-dense">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">
                <StatCounter value={15} suffix="+" />
              </div>
              <div className="text-xs text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">
                <StatCounter value={10000} suffix="+" />
              </div>
              <div className="text-xs text-gray-300">Brands Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">
                <StatCounter value={500} suffix="M+" decimals={0} />
              </div>
              <div className="text-xs text-gray-300">Labels Produced</div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold-800/20 border border-gold-800/50 rounded-lg">
              <span className="text-sm font-semibold">ISO 9001 Certified</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-gray-300">Free Sample Pack - Limited to First 50 Requests</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gold-800 hover:bg-gold-900 rounded-lg text-sm font-semibold transition-colors"
            >
              Request Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
