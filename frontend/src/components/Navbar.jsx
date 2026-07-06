import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import OfferTicker from './OfferTicker';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
    const location = useLocation();
    const { setIsCartOpen, cartCount } = useCart();
    const { businessInfo } = useData();
    const [scrolled, setScrolled] = useState(false);

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
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('pdh_welcome_dismissed_mobile', welcomeDismissedMobile ? '1' : '0');
        } catch (e) {}
    }, [welcomeDismissedMobile]);

    if (location.pathname && location.pathname.startsWith('/admin')) return null;
    if (businessInfo && businessInfo.maintenance) return null;

    const isActive = (path) => {
        return location.pathname === path || (location.pathname === '/' && path === '/home') ? 'active' : '';
    };

    const isAuthPage = ['/signup', '/login', '/forget', '/reset-password'].includes(location.pathname);

    const navLinks = isAuthPage
        ? [{ to: '/home', label: 'Home' }]
        : [
            { to: '/home', label: 'Home' },
            { to: '/menu', label: 'Menu' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ];

    const activeIndex = navLinks.findIndex(l =>
        location.pathname === l.to || (location.pathname === '/' && l.to === '/home')
    );
    const sliderRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (!listRef.current || activeIndex < 0) return;
        const items = listRef.current.querySelectorAll('li');
        const active = items[activeIndex];
        if (!active || !sliderRef.current) return;
        sliderRef.current.style.width = active.offsetWidth + 'px';
        sliderRef.current.style.left = active.offsetLeft + 'px';
    }, [activeIndex, location.pathname]);

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e) => {
            if (!e.target.closest('nav')) setMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [menuOpen]);

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 200,
                height: 'auto',
                lineHeight: 'normal',
            }}
        >
        {/* Top info strip — slides up and hides on scroll */}
            {businessInfo && !(isMobile && welcomeDismissedMobile) && (
                <div
                    className="hidden md:flex items-center justify-center relative bg-black text-white text-sm font-medium px-6 overflow-hidden"
                    style={{
                        maxHeight: scrolled ? 0 : '40px',
                        paddingTop: scrolled ? 0 : '8px',
                        paddingBottom: scrolled ? 0 : '8px',
                        opacity: scrolled ? 0 : 1,
                        transition: 'max-height 0.35s ease, padding 0.35s ease, opacity 0.25s ease',
                    }}
                >
                    <span className="absolute left-6 text-xs text-gray-400 font-medium tracking-wide">📞 {businessInfo?.phone || '98166-51543'}</span>
                    <div className="mx-2 text-center" style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
                        <span className="inline-flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
                                <path fill="currentColor" d="M12.7 2.3c.6.6.6 1.6 0 2.2L9.6 7.6l.7.7c1.1 1.1 1.1 2.9 0 4l-2.2 2.2c-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9l2.2-2.2c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L4.9 3.6C4.3 3 4.3 2 4.9 1.4c.6-.6 1.6-.6 2.2 0l2.8 2.8c.8.8 2 .8 2.8 0l.2-.2z" />
                                <path fill="currentColor" d="M21.1 10.3c-.6-.6-1.6-.6-2.2 0l-2.8 2.8c-.8.8-2 .8-2.8 0l-.2-.2c-.6-.6-.6-1.6 0-2.2l3.9-3.9c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-3 3c-.8.8-2 .8-2.8 0L8.4 6.1c-.6-.6-1.6-.6-2.2 0-.6.6-.6 1.6 0 2.2l5.9 5.9c1.6 1.6 4.2 1.6 5.8 0l3.2-3.2c.6-.6.6-1.6 0-2.2z" />
                            </svg>
                            <span className="font-medium">{businessInfo.welcomeText || `Welcome to ${businessInfo.name || 'Panditan Di Hatti'} — Fresh sweets made with love!`}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false" style={{ transform: 'scaleX(-1)' }}>
                                <path fill="currentColor" d="M12.7 2.3c.6.6.6 1.6 0 2.2L9.6 7.6l.7.7c1.1 1.1 1.1 2.9 0 4l-2.2 2.2c-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9l2.2-2.2c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L4.9 3.6C4.3 3 4.3 2 4.9 1.4c.6-.6 1.6-.6 2.2 0l2.8 2.8c.8.8 2 .8 2.8 0l.2-.2z" />
                                <path fill="currentColor" d="M21.1 10.3c-.6-.6-1.6-.6-2.2 0l-2.8 2.8c-.8.8-2 .8-2.8 0l-.2-.2c-.6-.6-.6-1.6 0-2.2l3.9-3.9c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-3 3c-.8.8-2 .8-2.8 0L8.4 6.1c-.6-.6-1.6-.6-2.2 0-.6.6-.6 1.6 0 2.2l5.9 5.9c1.6 1.6 4.2 1.6 5.8 0l3.2-3.2c.6-.6.6-1.6 0-2.2z" />
                            </svg>
                        </span>
                    </div>
                    <span className="absolute right-6 text-xs text-gray-400 font-medium tracking-wide">GSTIN: 02AMWPS9440GIZK</span>
                </div>
            )}

        <nav aria-label="Main navigation">
            {/* Hamburger — mobile only, LEFT side */}
            <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(o => !o)} style={{ position: 'relative' }}>
                <span></span><span></span><span></span>
                {menuOpen && (
                    <ul style={{ position: 'absolute', top: '110%', left: 0, width: '160px', background: 'var(--nav-bg)', borderRadius: '0 0 12px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', padding: '8px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', margin: 0 }}>
                        {navLinks.map(l => (
                            <li key={l.to}><Link to={l.to} className={isActive(l.to)} onClick={closeMenu} style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', color: '#fff', fontWeight: 600, fontSize: '0.95rem', background: 'rgba(255,255,255,0.1)' }}>{l.label}</Link></li>
                        ))}
                    </ul>
                )}
            </button>

            {/* Desktop nav links */}
            <ul className="nav-left flex-1" ref={listRef} style={{ position: 'relative' }}>
                <li style={{ position: 'absolute', bottom: 0, height: '3px', background: 'var(--accent)', borderRadius: '2px', transition: 'left 0.3s ease, width 0.3s ease', pointerEvents: 'none' }} ref={sliderRef} />
                {navLinks.map(l => (
                    <li key={l.to}><Link to={l.to} className={isActive(l.to)} onClick={closeMenu} style={{ display: 'inline-block', width: '90px', textAlign: 'center' }}>{l.label}</Link></li>
                ))}
            </ul>

            <div className="flex items-center gap-3 ml-auto">
                <div className="hidden md:flex items-center gap-3">
                    <ClockAndStatus businessInfo={businessInfo} />
                </div>
                {/* Cart */}
                <button onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-orange-200 transition p-1">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{cartCount}</span>
                    )}
                </button>
            </div>
        </nav>
        <OfferTicker />
        </div>
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
