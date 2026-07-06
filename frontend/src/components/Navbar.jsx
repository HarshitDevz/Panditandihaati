import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import OfferTicker from './OfferTicker';
import { useState, useEffect } from 'react';

function Navbar() {
    const location = useLocation();
    const { setIsCartOpen, cartCount } = useCart();

    // Hide main site navbar on admin routes
    const { businessInfo } = useData();

    // Dismissal applies only to mobile; allow desktop/tablet to always see the strip
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [welcomeDismissedMobile, setWelcomeDismissedMobile] = useState(() => {
        try {
            return localStorage.getItem('pdh_welcome_dismissed_mobile') === '1' || localStorage.getItem('pdh_welcome_dismissed') === '1';
        } catch (e) {
            return false;
        }
    });

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('pdh_welcome_dismissed_mobile', welcomeDismissedMobile ? '1' : '0');
        } catch (e) {
            // ignore
        }
    }, [welcomeDismissedMobile]);

    // Hide main site navbar on admin routes or when maintenance mode is active
    if (location.pathname && location.pathname.startsWith('/admin')) return null;
    if (businessInfo && businessInfo.maintenance) return null;

    const isActive = (path) => {
        return location.pathname === path || (location.pathname === '/' && path === '/home.html') ? 'active' : '';
    };

    const isAuthPage = ['/signup.html', '/login.html', '/forget.html', '/reset-password.html'].includes(location.pathname);

    const closeMenu = () => {
        const cb = document.getElementById('menu-toggle');
        if (cb) cb.checked = false;
    };

    return (
        <>
        {/* Top welcome strip */}
            {businessInfo && !(isMobile && welcomeDismissedMobile) && (
                <div className="hidden md:flex items-center justify-center bg-black text-white py-2 text-sm font-medium">
                        <div className="mx-2 text-center" style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                            <span className="inline-flex items-center gap-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
                                    <path fill="currentColor" d="M12.7 2.3c.6.6.6 1.6 0 2.2L9.6 7.6l.7.7c1.1 1.1 1.1 2.9 0 4l-2.2 2.2c-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9l2.2-2.2c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L4.9 3.6C4.3 3 4.3 2 4.9 1.4c.6-.6 1.6-.6 2.2 0l2.8 2.8c.8.8 2 .8 2.8 0l.2-.2z" />
                                    <path fill="currentColor" d="M21.1 10.3c-.6-.6-1.6-.6-2.2 0l-2.8 2.8c-.8.8-2 .8-2.8 0l-.2-.2c-.6-.6-.6-1.6 0-2.2l3.9-3.9c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-3 3c-.8.8-2 .8-2.8 0L8.4 6.1c-.6-.6-1.6-.6-2.2 0-.6.6-.6 1.6 0 2.2l5.9 5.9c1.6 1.6 4.2 1.6 5.8 0l3.2-3.2c.6-.6.6-1.6 0-2.2z" />
                                </svg>
                                <span className="font-medium">{businessInfo.welcomeText || (`Welcome to ${businessInfo.name || 'Panditan Di Hatti'} — Fresh sweets made with love!`)}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false" style={{ transform: 'scaleX(-1)' }}>
                                    <path fill="currentColor" d="M12.7 2.3c.6.6.6 1.6 0 2.2L9.6 7.6l.7.7c1.1 1.1 1.1 2.9 0 4l-2.2 2.2c-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9l2.2-2.2c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L4.9 3.6C4.3 3 4.3 2 4.9 1.4c.6-.6 1.6-.6 2.2 0l2.8 2.8c.8.8 2 .8 2.8 0l.2-.2z" />
                                    <path fill="currentColor" d="M21.1 10.3c-.6-.6-1.6-.6-2.2 0l-2.8 2.8c-.8.8-2 .8-2.8 0l-.2-.2c-.6-.6-.6-1.6 0-2.2l3.9-3.9c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-3 3c-.8.8-2 .8-2.8 0L8.4 6.1c-.6-.6-1.6-.6-2.2 0-.6.6-.6 1.6 0 2.2l5.9 5.9c1.6 1.6 4.2 1.6 5.8 0l3.2-3.2c.6-.6.6-1.6 0-2.2z" />
                                </svg>
                            </span>
                        </div>
                </div>
            )}
        <nav aria-label="Main navigation">
            {/* Hamburger Toggle */}
            <input type="checkbox" id="menu-toggle" aria-label="Toggle navigation menu" />
            <label htmlFor="menu-toggle" className="hamburger" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </label>

            {/* Left Menu */}
                <ul className="nav-left flex-1">
                <li><Link to="/home.html" className={isActive('/home.html')} onClick={closeMenu}>Home</Link></li>
                {!isAuthPage && (
                    <>
                        <li><Link to="/menu.html" className={isActive('/menu.html')} onClick={closeMenu}>Menu</Link></li>
                        <li><Link to="/about.html" className={isActive('/about.html')} onClick={closeMenu}>About</Link></li>
                        <li><Link to="/contact.html" className={isActive('/contact.html')} onClick={closeMenu}>Contact</Link></li>
                    </>
                )}
            </ul>

            {/* Right Menu & Cart */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Live Clock & Open/Closed badge */}
                <div className="hidden md:flex items-center gap-3 mr-2">
                    <ClockAndStatus businessInfo={businessInfo} />
                </div>
                {/* Right-side actions (cart etc.) — no admin link */}

                {/* Cart Icon */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative text-white hover:text-orange-200 transition p-1 mr-2"
                >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
        <OfferTicker />
        </>
    );
}

export default Navbar;

function ClockAndStatus({ businessInfo }) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const formatTime = (d) => {
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const getTodayHours = () => businessInfo?.openingHours || null;

    const isOpenNow = () => {
        const hours = businessInfo?.openingHours;
        if (!hours) return false;
        const todayName = now.toLocaleDateString('en-US', { weekday: 'long' });
        const times = hours[todayName];
        if (!times) return false;
        if (/closed/i.test(times)) return false;
        const m = times.split(/[-–—]/).map(s => s.trim());
        if (m.length < 2) return false;
        const parse = (p) => {
            const mm = p.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (!mm) return null;
            let hh = parseInt(mm[1], 10);
            const min = parseInt(mm[2], 10);
            const ap = mm[3].toUpperCase();
            if (ap === 'PM' && hh !== 12) hh += 12;
            if (ap === 'AM' && hh === 12) hh = 0;
            const d = new Date(now);
            d.setHours(hh, min, 0, 0);
            return d;
        };
        let start = parse(m[0]);
        let end = parse(m[1]);
        if (!start || !end) return false;
        if (end <= start) end.setDate(end.getDate() + 1);
        return now >= start && now <= end;
    };

    const open = isOpenNow();

    return (
        <div className="flex items-center gap-3">
            <div className="text-sm text-white/90 font-medium tracking-wide">{formatTime(now)}</div>
            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${open ? 'bg-emerald-500 text-white animate-pulse' : 'bg-red-600 text-white'}`}>
                {open ? 'Open' : 'Closed'}
            </div>
        </div>
    );
}
