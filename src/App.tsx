import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import MouseFollower from './components/MouseFollower';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <MouseFollower />
      {/* Background particles */}
      <Particles />

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
