import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const line = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function PremiumHero({ title = 'Panditan Di Hatti', subtitle, ctaText = 'Order Now' }) {
  const ref = useRef(null);
  const { businessInfo } = useData();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const { scrollY } = useScroll({ target: ref });
  const bgScale = useTransform(scrollY, [0, 400], [1.05, 1]);
  const bgY = useTransform(scrollY, [0, 400], [0, -40]);

  const words = String(title).split(' ');

  return (
    <motion.header ref={ref} className="hero relative overflow-hidden py-20 px-6 md:px-12 text-center bg-gradient-to-br from-[#fff7f0] to-[#fffdf6]">
      {/* Full-screen hero video (place your MP4 at /public/videos/hero.mp4). If missing, poster image will show. */}
      <video
        src="/videos/hero.mp4"
        poster="/images/SHOP.avif"
        className="absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Background overlay for subtle parallax and color wash */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 pointer-events-none -z-5">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/images/SHOP.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>
      </motion.div>

      <motion.div className="relative max-w-4xl mx-auto" variants={container} initial="hidden" animate="visible">
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight overflow-hidden">
          {words.map((w, i) => (
            <motion.span key={i} className="inline-block mr-3" variants={line}>
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto" variants={line}>
            {subtitle}
          </motion.p>
        )}

        <motion.div className="flex justify-center" variants={line}>
          <Link to="/menu.html" className="relative inline-block">
            <motion.button whileHover={{ scale: 1.05, y: -3 }} transition={{ duration: 0.18 }} className="bg-[#ff9800] text-white px-8 py-3 rounded-2xl font-bold shadow-2xl">
              {ctaText}
            </motion.button>
          </Link>
          {/* Open/Closed badge */}
          <div className="ml-4 flex items-center gap-3">
            <div className="text-sm text-gray-600">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isOpenHero(businessInfo, now) ? 'bg-emerald-500 text-white' : 'bg-red-600 text-white'}`}>
              {isOpenHero(businessInfo, now) ? 'Open' : 'Closed'}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}

function isOpenHero(businessInfo, now) {
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
}
