import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ReviewsCarousel({ items = [] }) {
    const [index, setIndex] = useState(0);

    const prev = useCallback(() => {
        setIndex(i => (i - 1 + items.length) % items.length);
    }, [items.length]);

    const next = useCallback(() => {
        setIndex(i => (i + 1) % items.length);
    }, [items.length]);

    useEffect(() => {
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [next]);

    useEffect(() => {
        function onKey(e) {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    if (!items || items.length === 0) return null;

    const current = items[index];

    return (
        <div className="reviews-carousel max-w-3xl mx-auto relative">
            <button aria-label="Previous review" onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full shadow-md hover:bg-white">
                ‹
            </button>

            <motion.article key={current.id || index} className="review-card mx-auto" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                {current.image && <img className="avatar" src={current.image} alt={current.name || 'Reviewer'} />}
                <h3 className="name">{current.name || 'Guest'}</h3>
                <div className="stars" aria-label={`${current.rating || 5} out of 5 stars`}>{'★'.repeat(current.rating || 5)}</div>
                <p className="review">{current.text || current.review || current.comment}</p>
            </motion.article>

            <button aria-label="Next review" onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full shadow-md hover:bg-white">
                ›
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
                {items.map((it, i) => (
                    <button key={i} aria-label={`Show review ${i+1}`} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-[#ff9800]' : 'bg-gray-300'}`}></button>
                ))}
            </div>
        </div>
    );
}
