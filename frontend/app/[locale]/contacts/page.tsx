import { Header } from '@/components/header';
import { MultiStepForm } from '@/components/sections/multi-step-form';
import { ContactWidget } from '@/components/ui/contact-widget';
import { Footer } from '@/components/footer';

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <MultiStepForm />
      </main>
      <Footer />
      <ContactWidget />
    </>
  );
}
