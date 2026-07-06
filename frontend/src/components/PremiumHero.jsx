import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const line = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function PremiumHero({
  title = 'Panditan Di Hatti',
  subtitle,
  ctaText = 'Order Now',
  eyebrow = 'Established 1980',
  highlights = ['Premium sweets', 'Fresh preparation', 'Trusted locally'],
  image = '/images/shop.png',
  accentImage = '/images/BESAN BARFI.png'
}) {
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
    <motion.header ref={ref} className="hero relative overflow-hidden bg-gradient-to-br from-[#fffaf3] via-[#fff7ef] to-[#fffdf9] px-4 py-8 md:px-10 md:py-20" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-[#d9a15f]/18 blur-3xl" />
        <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-[#e6c18f]/22 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.82),_transparent_54%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.5)_62%,rgba(255,255,255,0.92))]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div className="relative z-10 max-w-2xl" variants={container} initial="hidden" animate="visible">
          <motion.div variants={line} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9c3a7] bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#8d5b24] shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#ff9800]" />
            {eyebrow}
          </motion.div>

          <motion.h1 className="overflow-hidden text-left text-3xl font-black leading-[0.94] tracking-tight text-[#21140f] sm:text-4xl md:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span key={`${word}-${index}`} className="mr-3 inline-block" variants={line}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p className="mt-5 max-w-xl text-left text-base leading-7 text-[#5a4a3a] md:text-lg" variants={line}>
            {subtitle || `A refined sweets counter offering traditional mithai, savoury snacks, and dependable daily service in a presentation that feels established and orderly.`}
          </motion.p>

          <motion.div variants={line} className="mt-7 flex flex-wrap items-center gap-4">
            <Link to="/menu" className="relative inline-flex items-center">
              <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.18 }} className="rounded-2xl bg-[#ff9800] px-7 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(255,152,0,0.32)]">
                {ctaText}
              </motion.button>
            </Link>

            <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d5b24]">Today</div>
              <div className="text-sm font-bold text-[#21140f]">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className={`rounded-full px-3 py-1 text-xs font-bold ${isOpenHero(businessInfo, now) ? 'bg-emerald-500 text-white' : 'bg-red-600 text-white'}`}>
                {isOpenHero(businessInfo, now) ? 'Open' : 'Closed'}
              </div>
            </div>
          </motion.div>

          <motion.div variants={line} className="mt-7 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-full border border-[#e4d2bc] bg-white/88 px-4 py-2 text-sm font-semibold text-[#61442e] shadow-sm backdrop-blur">
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="relative z-10 mx-auto w-full max-w-xl" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
          <div className="rounded-[2rem] border border-white/85 bg-white/68 p-3 shadow-[0_24px_70px_rgba(77,48,15,0.14)] backdrop-blur-lg flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <motion.div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.12))]" animate={{ opacity: [0.55, 0.82, 0.55] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.img
                src={image}
                alt="Panditan Di Hatti shop front in Hamirpur, Himachal Pradesh"
                width={600}
                height={460}
                fetchPriority="high"
                className="relative w-full rounded-[1.6rem] object-contain object-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.div className="rounded-2xl bg-white p-3 shadow-md" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.55 }}>
              <div className="flex items-center gap-3">
                <img src={accentImage} alt="Besan Barfi - featured sweet" width={48} height={48} className="h-12 w-12 rounded-xl object-cover shadow-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d5b24]">Featured sweet</p>
                  <p className="text-sm font-semibold text-[#21140f]">Golden pieces, hand-finished daily</p>
                </div>
                <div className="rounded-2xl bg-[#24150f] px-3 py-2 text-white shadow-lg flex-shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4d2a7]">Visit us</p>
                  <p className="text-sm font-semibold">{businessInfo?.phone || 'Open for orders'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
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
