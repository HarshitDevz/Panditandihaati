import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useData } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './pages/Admin/Dashboard';
import SpecialOfferBox from './components/SpecialOfferBox';
import SplashScreen from './components/SplashScreen';

// Lazy loading the page components
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ForgetPassword = React.lazy(() => import('./pages/ForgetPassword'));
const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));

function App() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
    <DataProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }} aria-live="polite">Loading...</div>}>
            <main id="main-content">
              <AnimatedRoutes />
            </main>
          </Suspense>
            <SpecialOfferBox />
          <Footer />
        </Router>
      </CartProvider>
    </DataProvider>
    </>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const { businessInfo } = useData();
  // Instead of the above fragile access, we'll import useData here via dynamic require
  // Fallback: If businessInfo indicates maintenance, show MaintenancePage for public routes.

  // Simple Maintenance page
  const Maintenance = () => (
    <div style={{ padding: 80, textAlign: 'center' }}>
      <h1 style={{ fontSize: 56, marginBottom: 12, fontWeight: 800 }}>We'll be right back</h1>
      <p style={{ color: '#6b6b6b', marginBottom: 18, fontSize: 20 }}>The site is currently under maintenance. We're working on improvements — please check back shortly.</p>
      <p style={{ color: '#333', fontSize: 18, marginBottom: 6, fontWeight: 700 }}>Contact: {businessInfo?.phone || '—'}</p>
      <p style={{ color: '#333', marginTop: 12, fontWeight: 800, fontSize: 18 }}>Thank you for your cooperation — {businessInfo?.name || 'Panditan Di Hatti'}</p>
    </div>
  );

  // If maintenance enabled and not admin route, show maintenance
  const maintenanceActive = businessInfo && businessInfo.maintenance;

  if (maintenanceActive && !location.pathname.startsWith('/admin')) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Maintenance />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}
