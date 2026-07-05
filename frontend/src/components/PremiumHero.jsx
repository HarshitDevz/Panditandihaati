import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
