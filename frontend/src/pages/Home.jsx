import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import PremiumHero from '../components/PremiumHero';
import CategoryFilter from '../components/CategoryFilter';
import ReviewsCarousel from '../components/ReviewsCarousel';

const gridContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};

const gridItem = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function YoutubeFacade({ videoId }) {
    const [loaded, setLoaded] = useState(false);
    const wrapper = { position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.22)', cursor: 'pointer' };
    if (loaded) {
        return (
            <div style={wrapper}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&modestbranding=1`}
                    title="PM Modi Ji featuring Pandittan Di Hatti Besan Barfi"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
            </div>
        );
    }
    return (
        <div style={wrapper} onClick={() => setLoaded(true)} role="button" aria-label="Play PM Modi Ji video">
            <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt="PM Modi Ji featuring Pandittan Di Hatti — tap to play"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy" width={720} height={405}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 72, height: 72, background: '#ff0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                    <svg viewBox="0 0 24 24" fill="white" width="34" height="34"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>Tap to play</div>
        </div>
    );
}

function Home() {
    const { products, businessInfo, announcements } = useData();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const activeAnnouncements = announcements.filter(a => a.active);

    return (
        <>
            {/* Announcement Ticker */}
            {activeAnnouncements.length > 0 && (
                <div className="bg-[#a46116] text-white py-2 overflow-hidden whitespace-nowrap relative z-[50] border-b border-white/10 shadow-sm">
                    <div className="animate-marquee inline-block px-10">
                        {activeAnnouncements.map(a => (
                            <span key={a.id} className="mx-8 font-bold text-sm tracking-wide">📢 {a.text}</span>
                        ))}
                        {activeAnnouncements.map(a => (
                            <span key={a.id} className="mx-8 font-bold text-sm tracking-wide">📢 {a.text}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Hero + About wrapper for slide-over effect */}
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <PremiumHero
                        title="Pandittan Di Hatti"
                        subtitle={<>A refined sweets and snacks counter, presented with a calm animated storefront and clear emphasis on quality, freshness, and trust.<br /><strong>Anu, Hamirpur, Himachal Pradesh — 177005.</strong></>}
                        ctaText="View Menu"
                        eyebrow="Established 1980"
                        highlights={['Premium sweets', 'Fresh preparation', 'Trusted locally']}
                        image="/images/shop.webp"
                        accentImage="/images/BESAN BARFI.webp"
                    />
                </div>

                {/* Card 1 — About: slides over Hero */}
                <section className="about" style={{ position: 'relative', zIndex: 2, borderRadius: '32px 32px 0 0', background: '#fffdf8', boxShadow: '0 -16px 60px rgba(0,0,0,0.12)', width: '100%', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 48px)', maxWidth: '100%', margin: 0, display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                    <div className="section-shell about-shell" style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
                        <div className="section-copy">
                            <p className="section-kicker">Our Story</p>
                            <h2>Traditional sweets, presented with care</h2>
                            <p>{businessInfo.aboutUs}</p>
                            <div className="section-pills">
                                <span>Fresh batches daily</span>
                                <span>Made with care</span>
                                <span>Trusted by locals</span>
                            </div>
                        </div>
                        <div className="section-media">
                            <img src="images/OWNER.webp" loading="lazy" alt="Owner of Pandittan Di Hatti" width={440} height={440} />
                        </div>
                    </div>
                </section>
            </div>

            {/* Card 2 — Menu */}
            <section className="menu text-center" style={{ background: '#fff8f0', width: '100%', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 48px)', maxWidth: '100%', margin: 0, display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                <div className="section-shell menu-shell" style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
                    <div className="section-copy text-center">
                        <p className="section-kicker">Signature Picks</p>
                        <h2>Signature picks from the counter</h2>
                        <p>We keep the focus on one hero product here, styled as a clean premium feature so the page reads with intent and clarity.</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <CategoryFilter categories={[]} selected={selectedCategory} onSelect={setSelectedCategory} showAll={false} />
                    </div>
                    <motion.div className="menu-grid flex flex-wrap justify-center items-center gap-6 mt-8" variants={gridContainer} initial="hidden" animate="visible">
                        {products.filter(p => p.visible && /besan barfi/i.test(p.name)).slice(0, 1).map(product => (
                            <motion.div key={product.id} className="menu-item border-none !m-0 w-full max-w-sm mx-auto" variants={gridItem}>
                                <motion.div className="menu-img relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-sm mx-auto md:w-[320px] md:h-[200px]" whileHover={{ scale: 1.03 }}>
                                    <img src={product.image} loading="lazy" alt={product.name} className="w-full h-48 md:h-full object-cover transition duration-500 hover:scale-110 relative z-0" />
                                    <div className="overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-300 z-20">
                                        <h4 className="text-white text-xl font-bold">{product.name}</h4>
                                        <p className="text-white text-sm">Tap to view menu &amp; buy</p>
                                        <Link to="/menu" className="mt-3 px-4 py-2 bg-[#ff9800] text-white rounded-full font-bold shadow z-30">Show All</Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Card 3 — PM Modi */}
            <section className="modi-promo" style={{ background: '#fffdf8', width: '100%', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 48px)', maxWidth: '100%', margin: 0, display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                <div className="section-shell flex flex-col items-center gap-6" style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
                    <div className="modi-text text-center">
                        <p className="section-kicker">Featured Mention</p>
                        <h2>PM Modi Ji Featured Us !!</h2>
                        <p>Coverage from public fan pages brought attention to our <strong>Besan Barfi</strong>, highlighting the product quality and local appeal.</p>
                    </div>
                    <YoutubeFacade videoId="QOZa-VSTyek" />
                </div>
            </section>

            {/* Card 4 — Reviews */}
            <section className="reviews-section" id="customer-reviews" style={{ background: '#fff8f0', width: '100%', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 48px)', maxWidth: '100%', margin: 0, display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                <div className="section-shell reviews-shell" style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
                    <div className="reviews-header">
                        <p className="section-kicker">Social proof</p>
                        <h2>Customer Reviews</h2>
                        <p>Real words from people!</p>
                    </div>
                    <ReviewsCarousel items={[
                        { id: 1, name: 'Ramesh', rating: 5, image: 'images/1.avif', text: 'Best besan barfi I have ever had! Must try!' },
                        { id: 2, name: 'Priya', rating: 4, image: 'images/3.webp', text: 'Pure, tasty local Himachali flavors - I love it!' },
                        { id: 3, name: 'Yuvraj', rating: 5, image: 'images/2.webp', text: 'Whenever I visit Hamirpur, I never miss it!' },
                        { id: 4, name: 'Anka', rating: 5, image: 'images/4.webp', text: 'Best traditional Himachali sweets particularly besan ke barfi. Service is excellent and very well behaved shop owner and staff!! Must try Besan Ke Barfi!!' }
                    ]} />
                    {/* <div className="reviews-cta">
                        <a className="cta-btn" href="https://g.page/r/Pandittandihaati/review" target="_blank" rel="noopener noreferrer">📝 Write a Review</a>
                    </div> */}
                </div>
            </section>
        </>
    );
}

export default Home;
