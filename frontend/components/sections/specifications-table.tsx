'use client';

import { motion } from 'framer-motion';

interface Specification {
  material: string;
  sizes: string;
  colors: string;
  edgeFinishing: string;
  backing: string;
  durability: string;
  priceTier: string;
}

const specifications: Specification[] = [
  {
    material: '100% Polyester Taffeta',
    sizes: '10mm - 100mm (5mm increments)',
    colors: 'Up to 12 colors (Woven)',
    edgeFinishing: 'Ultrasonic cut, Hot cut, Folded hem',
    backing: 'Heat seal (150°C, 15s), Sew-on, Adhesive',
    durability: '100+ industrial wash cycles at 85°C',
    priceTier: '$0.15 - $0.45/piece',
  },
  {
    material: 'Cotton Satin',
    sizes: '15mm - 80mm',
    colors: 'Up to 8 colors',
    edgeFinishing: 'Ultrasonic cut, Folded hem',
    backing: 'Sew-on, Heat seal',
    durability: '80+ wash cycles',
    priceTier: '$0.18 - $0.50/piece',
  },
  {
    material: 'Damask',
    sizes: '12mm - 120mm',
    colors: 'Up to 15 colors',
    edgeFinishing: 'Ultra-precise cut',
    backing: 'All options available',
    durability: '120+ wash cycles',
    priceTier: '$0.25 - $0.65/piece',
  },
];

export function SpecificationsTable() {
  return (
    <section className="py-12 bg-white dark:bg-navy-900">
      <div className="container-dense">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-heading text-navy-950 dark:text-gray-50">
              Material Specifications
            </h2>
            <button className="px-4 py-2 bg-gold-800 hover:bg-gold-900 text-white rounded-lg text-sm font-medium transition-colors">
              Download PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-navy-800">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Material Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Available Sizes
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Color Options
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Edge Finishing
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Backing Options
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Washing Durability
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-navy-950 dark:text-gray-50 border-b border-gray-200 dark:border-navy-700">
                    Price Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.material}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.sizes}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.colors}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.edgeFinishing}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.backing}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-navy-700">
                      {spec.durability}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gold-800 dark:text-gold-600 border-b border-gray-200 dark:border-navy-700">
                      {spec.priceTier}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
