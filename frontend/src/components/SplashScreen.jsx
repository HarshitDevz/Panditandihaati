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
                        style={{ color: '#FFF8F3', fontSize: 'clamp(11px, 2.8vw, 14px)', margin: 0, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 800, textAlign: 'center', lineHeight: 1.7 }}
                    >
                        Taste of<br />Hamirpur, Himachal Pradesh
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
                        {/* <motion.svg
                            width="48" height="48" viewBox="0 0 24 24" fill="none"
                            animate={{ filter: ['drop-shadow(0 0 6px #ffb347)', 'drop-shadow(0 0 18px #ff8c00)', 'drop-shadow(0 0 6px #ffb347)'] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 15.55 3.82 18.68 6.63 20.48L7.5 19.1C5.19 17.57 3.66 14.95 3.66 12C3.66 7.4 7.4 3.66 12 3.66C16.6 3.66 20.34 7.4 20.34 12C20.34 14.95 18.81 17.57 16.5 19.1L17.37 20.48C20.18 18.68 22 15.55 22 12C22 6.48 17.52 2 12 2Z" fill="#FFF8F3"/>
                            <path d="M12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6Z" fill="#FFF8F3"/>
                            <path d="M9 19.5V22H15V19.5H9Z" fill="#FFF8F3"/>
                        </motion.svg> */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}