'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { ProductionCapacity } from './sections/production-capacity';

export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/catalog', label: t('catalog') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/pricing', label: t('pricing') },
    { href: '/contacts', label: t('contacts') },
  ];

  return (
    <motion.header
          className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-navy-950/98 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-navy-800'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-dense">
        <nav className="flex items-center justify-between h-20 gap-4">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <motion.span
              className={`text-2xl font-bold font-heading ${
                isScrolled
                  ? 'text-navy-950 dark:text-gray-50'
                  : 'text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Paradise<span className="text-gold-800">.</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? isScrolled
                        ? 'text-gold-800 dark:text-gold-600'
                        : 'text-gold-400'
                      : isScrolled
                      ? 'text-navy-950 dark:text-gray-50 hover:text-gold-800'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-gold-800' : 'bg-gold-400'
                      }`}
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <ProductionCapacity />
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/contacts"
              className="px-6 py-2 bg-gold-800 hover:bg-gold-900 text-white rounded-lg font-medium transition-colors shadow-gold whitespace-nowrap"
            >
              {useTranslations('common')('getQuote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-text-primary dark:bg-dark-text-primary"
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : {}}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary dark:bg-dark-text-primary"
              animate={isMobileMenuOpen ? { opacity: 0 } : {}}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary dark:bg-dark-text-primary"
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : {}}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-20 bg-white dark:bg-dark-bg-primary z-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium ${
                      pathname === item.href
                        ? 'text-accent'
                        : 'text-text-primary dark:text-dark-text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-border dark:border-dark-border">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
