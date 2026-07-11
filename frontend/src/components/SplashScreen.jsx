import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onDone }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 650);
        }, 1400);
        return () => clearTimeout(t);
    }, [onDone]);

    const item = (delay) => ({
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0, transition: { delay, duration: 0.28, ease: 'easeOut' } },
        exit:    { opacity: 0, y: -14, transition: { duration: 0.22, ease: 'easeIn' } },
    });

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'linear-gradient(135deg, #B86B2E 0%, #7a3a10 100%)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                >
                    <motion.div {...item(0)} style={{ width: 40, height: 3, background: '#FFF8F3', borderRadius: 2 }} />
                    <motion.h1
                        {...item(0.1)}
                        style={{
                            color: '#FFF8F3', fontFamily: 'Playfair Display, Georgia, serif',
                            fontSize: 'clamp(22px, 6vw, 38px)', fontWeight: 800,
                            margin: 0, letterSpacing: 1, textAlign: 'center',
                            textShadow: '0 0 30px rgba(255,200,100,0.9), 0 0 60px rgba(255,160,50,0.6), 0 0 100px rgba(255,120,0,0.3)',
                        }}
                    >
                        Pandittan Di Hatti
                    </motion.h1>
                    <motion.p
                        {...item(0.2)}
                        style={{ color: '#f9faf9', fontSize: 'clamp(20px, 2.8vw, 14px)', margin: 0, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 800, textAlign: 'center', lineHeight: 1.7 }}
                    >
                       Taste Of Hamirpur HP !!
                    </motion.p>
                    <motion.p
                        {...item(0.3)}
                        style={{ color: '#F6ECE6bb', fontSize: 'clamp(12px, 3vw, 15px)', margin: 0, letterSpacing: 3, textTransform: 'uppercase' }}
                    >
                        Welcomes You
                    </motion.p>
                    <motion.div {...item(0.38)} style={{ width: 40, height: 3, background: '#E0893A', borderRadius: 2 }} />
                    <motion.div
                        {...item(0.45)}
                        style={{ marginTop: 6 }}
                    >
                        {/* <motion.svg>
                            <svg xmlns="http://w3.org" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <!-- Background Soft Glow -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9E6" stop-opacity="1" />
      <stop offset="60%" stop-color="#FFFFFF" stop-opacity="1" />
      <stop offset="100%" stop-color="#F2F5F8" stop-opacity="1" />
    </radialGradient>

    <!-- Aura Aura Gradient -->
    <radialGradient id="auraGlow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#FFD700" stop-opacity="0.35" />
      <stop offset="45%" stop-color="#FF9F43" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FF9F43" stop-opacity="0" />
    </radialGradient>

    <!-- Sleek Line Gradient -->
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A2530" />
      <stop offset="70%" stop-color="#2C3E50" />
      <stop offset="100%" stop-color="#4A5B6D" />
    </linearGradient>

    <!-- Drop Shadow for Depth -->
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#1A2530" flood-opacity="0.06" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="100%" height="100%" fill="url(#bgGlow)" />

  <!-- Sacred Geometry / Aura Background -->
  <circle cx="250" cy="225" r="140" fill="url(#auraGlow)" />
  <circle cx="250" cy="225" r="139" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.4" />
  
  <!-- Geometric Halo Accents -->
  <g stroke="#FF9F43" stroke-width="1" opacity="0.25" fill="none">
    <circle cx="250" cy="225" r="160" />
    <circle cx="250" cy="225" r="180" />
  </g>

  <!-- Light Rays -->
  <g stroke="#FFD700" stroke-width="2" stroke-linecap="round" opacity="0.6">
    <line x1="250" y1="55" x2="250" y2="40" />
    <line x1="130" y1="130" x2="119" y2="119" />
    <line x1="370" y1="130" x2="381" y2="119" />
    <line x1="80" y1="225" x2="65" y2="225" />
    <line x1="420" y1="225" x2="435" y2="225" />
  </g>

  <!-- Main Praying Hands Graphic Layer -->
  <g filter="url(#subtleShadow)">
    
    <!-- Left Hand Shadow Fill (Adds Dimension) -->
    <path d="M190 390 C210 350 228 230 248 120 C242 160 215 280 200 340 C195 360 190 375 190 390 Z" fill="#FF9F43" opacity="0.1" />
    
    <!-- Right Hand Shadow Fill -->
    <path d="M310 390 C290 350 272 230 252 120 C258 160 285 280 300 340 C305 360 310 375 310 390 Z" fill="#FF9F43" opacity="0.05" />

    <!-- Core Line Art Group -->
    <g fill="none" stroke="url(#lineGrad)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">
      
      <!-- Left Hand Profile Outline -->
      <path d="M185 410 C185 390 192 360 202 320 C215 270 232 180 248 115" />
      
      <!-- Right Hand Profile Outline -->
      <path d="M315 410 C315 390 308 360 298 320 C285 270 268 180 252 115" />

      <!-- Left Thumb and Outer Palm Curve -->
      <path d="M212 285 C190 275 175 295 180 320 C185 345 200 375 215 405" />
      
      <!-- Right Thumb and Outer Palm Curve -->
      <path d="M288 285 C310 275 325 295 320 320 C315 345 300 375 285 405" />

      <!-- Left Hand Inner Finger Details (Overlap creases) -->
      <path d="M210 230 C225 220 238 180 246 135" />
      <path d="M198 270 C215 260 230 210 242 165" />
      <path d="M190 310 C210 300 225 260 238 205" />

      <!-- Right Hand Inner Finger Details -->
      <path d="M290 230 C275 220 262 180 254 135" />
      <path d="M302 270 C285 260 270 210 258 165" />
      <path d="M310 310 C290 300 275 260 262 205" />

      <!-- Wrist/Sleeve Base Lines -->
      <path d="M165 430 C190 425 230 422 250 422 C270 422 310 425 335 430" stroke-width="5" />
      <path d="M185 410 C210 412 235 414 250 414 C265 414 290 412 315 410" stroke-width="4" opacity="0.6" />
      
    </g>
  </g>

  <!-- Central Lotus/Light Focal Point Below Hands -->
  <path d="M225 422 C235 412 242 410 250 410 C258 410 265 412 275 422" fill="none" stroke="#FF9F43" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
</svg>

                        </motion.svg> */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}