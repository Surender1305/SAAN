import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import MouseFollower from './components/MouseFollower';
import AdminDashboard from './components/AdminDashboard';
import { ContentProvider } from './context/ContentContext';

function isAdminRouteActive(): boolean {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/adminrss' ||
    path.startsWith('/adminrss/') ||
    hash === '#adminrss' ||
    hash === '#/adminrss'
  );
}

function AppContent() {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(isAdminRouteActive);

  useEffect(() => {
    const syncRoute = () => {
      setIsAdminOpen(isAdminRouteActive());
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('admin-cms-active', isAdminOpen);
    return () => {
      document.documentElement.classList.remove('admin-cms-active');
    };
  }, [isAdminOpen]);

  const closeAdmin = () => {
    setIsAdminOpen(false);
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (path === '/adminrss' || path.startsWith('/adminrss/')) {
      window.history.pushState(null, '', '/');
    } else if (
      window.location.hash.toLowerCase() === '#adminrss' ||
      window.location.hash.toLowerCase() === '#/adminrss'
    ) {
      window.history.pushState(null, '', window.location.pathname || '/');
    }
  };

  if (isAdminOpen) {
    return <AdminDashboard onClose={closeAdmin} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
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

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}
