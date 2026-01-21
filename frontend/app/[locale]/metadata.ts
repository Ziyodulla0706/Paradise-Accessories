import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: {
      default: 'Paradise Accessories - Премиальные бирки и этикетки',
      template: '%s | Paradise Accessories',
    },
    description: t('tagline'),
    keywords: [
      'бирки для одежды',
      'этикетки',
      'жаккардовые этикетки',
      'производство бирок',
      'Paradise Accessories',
      'Узбекистан',
    ],
    authors: [{ name: 'Paradise Accessories' }],
    creator: 'Paradise Accessories',
    publisher: 'Paradise Accessories',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
      languages: {
        'ru': '/ru',
        'en': '/en',
        'uz': '/uz',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: '/',
      title: 'Paradise Accessories - Премиальные бирки и этикетки',
      description: t('tagline'),
      siteName: 'Paradise Accessories',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Paradise Accessories',
      description: t('tagline'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
