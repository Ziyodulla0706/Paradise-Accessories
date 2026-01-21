import { Header } from '@/components/header';
import { TrustBar } from '@/components/sections/trust-bar';
import { HeroDense } from '@/components/sections/hero-dense';
import { CapabilitiesGrid } from '@/components/sections/capabilities-grid';
import { Advantages } from '@/components/sections/advantages';
import { PriceCalculator } from '@/components/calculators/price-calculator';
import { ContactForm } from '@/components/sections/contact-form';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { ContactWidget } from '@/components/ui/contact-widget';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroDense />
        <TrustBar />
        <CapabilitiesGrid />
        <Advantages />
        <PriceCalculator />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <ContactWidget />
    </>
  );
}
