import React, { Suspense } from 'react';
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
  return (
    <DataProvider>
      <CartProvider>
        <Router>
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
  );
}

export default App;

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
        <Route path="/home.html" element={<Home />} />
        <Route path="/menu.html" element={<Menu />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/privacy.html" element={<Privacy />} />
        <Route path="/terms.html" element={<Terms />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/signup.html" element={<Signup />} />
        <Route path="/forget.html" element={<ForgetPassword />} />
        <Route path="/reset-password.html" element={<ForgetPassword />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}
