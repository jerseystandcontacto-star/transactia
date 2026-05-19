import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogosStrip from '@/components/LogosStrip';
import Services from '@/components/Services';
import WhyTransactia from '@/components/WhyTransactia';
import DarkCTA from '@/components/DarkCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogosStrip />
        <Services />
        <WhyTransactia />
        <DarkCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
