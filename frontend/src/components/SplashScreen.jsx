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
                        }}
                    >
                        Panditan Di Hatti
                    </motion.h1>
                    <motion.p
                        {...item(0.22)}
                        style={{ color: '#F6ECE6bb', fontSize: 'clamp(12px, 3vw, 15px)', margin: 0, letterSpacing: 3, textTransform: 'uppercase' }}
                    >
                        Welcomes You
                    </motion.p>
                    <motion.div {...item(0.32)} style={{ width: 40, height: 3, background: '#E0893A', borderRadius: 2 }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
