import { MotionConfig } from 'motion/react';
import Header from './components/Header.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './components/Hero.jsx';
import QuickActions from './components/QuickActions.jsx';
import CoreMessage from './components/CoreMessage.jsx';
import LaunchServices from './components/LaunchServices.jsx';
import PremiumServices from './components/PremiumServices.jsx';
import EarlyFlight from './components/EarlyFlight.jsx';
import ArrivalAssist from './components/ArrivalAssist.jsx';
import Difference from './components/Difference.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Destinations from './components/Destinations.jsx';
import About from './components/About.jsx';
import Business from './components/Business.jsx';
import Trust from './components/Trust.jsx';
import Faq from './components/Faq.jsx';
import RequestAssistance from './components/RequestAssistance.jsx';
import Footer from './components/Footer.jsx';
import StickyBar from './components/StickyBar.jsx';
import { ease } from './lib/motion.js';

export default function App() {
  return (
    // reducedMotion="user" lets every animation below stay written the obvious
    // way: Motion drops transforms to a cross-fade when the OS asks for less.
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* Order follows the homepage commercial flow in the brief (section 24). */}
        <Hero />
        <QuickActions />
        <CoreMessage />
        <LaunchServices />
        <PremiumServices />
        <EarlyFlight />
        <ArrivalAssist />
        <Difference />
        <HowItWorks />
        <Destinations />
        <About />
        <Business />
        <Trust />
        <Faq />
        <RequestAssistance />
      </main>
      <Footer />
      <StickyBar />
    </MotionConfig>
  );
}
