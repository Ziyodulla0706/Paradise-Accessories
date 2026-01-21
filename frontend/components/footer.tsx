'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <footer className="bg-graphite dark:bg-dark-bg-primary text-white dark:text-dark-text-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Paradise<span className="text-accent-light">.</span>
            </h3>
            <p className="text-gray-400 dark:text-dark-text-secondary">
              {tCommon('tagline')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('portfolio')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition-colors">
                  {t('contacts')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400 dark:text-dark-text-secondary">
              <li>+998 90 123 45 67</li>
              <li>info@paradise-accessories.uz</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-dark-border pt-8 text-center text-gray-400 dark:text-dark-text-secondary">
          <p>&copy; {new Date().getFullYear()} Paradise Accessories. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
