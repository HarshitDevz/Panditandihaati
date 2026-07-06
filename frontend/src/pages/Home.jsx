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

const fadeInUp = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

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
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 30s linear infinite;
                        }
                    `}</style>
                </div>
            )}

            {/* Premium Hero */}
            <PremiumHero
                title="Panditan Di Hatti"
                subtitle="A refined sweets and snacks counter, presented with a calm animated storefront and clear emphasis on quality, freshness, and trust."
                ctaText="View Menu"
                eyebrow="Established 1980"
                highlights={['Premium sweets', 'Fresh preparation', 'Trusted locally']}
                image="/images/shop.png"
                accentImage="/images/BESAN BARFI.png"
            />

            {/* About Section - slides up over hero like a card */}
            <section className="about" style={{
                position: 'relative',
                zIndex: 10,
                marginTop: '-40px',
                borderRadius: '32px 32px 0 0',
                background: '#fffdf8',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.10)',
            }}>
                <div className="section-shell about-shell">
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
                        <img src="images/OWNER.png" loading="lazy" alt="Owner of Panditan Di Hatti" width={440} height={440} />
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <motion.section className="menu text-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
                <div className="section-shell menu-shell">
                    <div className="section-copy text-center">
                        <p className="section-kicker">Signature Picks</p>
                        <h2>Signature picks from the counter</h2>
                        <p>We keep the focus on one hero product here, styled as a clean premium feature so the page reads with intent and clarity.</p>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <CategoryFilter categories={[]} selected={selectedCategory} onSelect={setSelectedCategory} showAll={false} />
                    </div>

                    <motion.div className="menu-grid flex flex-wrap justify-center items-center gap-6 mt-8" variants={gridContainer} initial="hidden" animate="visible">
                        {products.filter(p => p.visible && (p.name && /besan barfi/i.test(p.name))).slice(0,1).map(product => (
                            <motion.div key={product.id} className="menu-item border-none !m-0 w-full max-w-sm mx-auto" variants={gridItem}>
                                <motion.div className="menu-img relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-sm mx-auto md:w-[320px] md:h-[200px]" whileHover={{ scale: 1.03 }}>
                                    <img src={product.image} loading="lazy" alt={product.name} className="w-full h-48 md:h-full object-cover transition duration-500 hover:scale-110 relative z-0" />
                                    <div className="overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-300 z-20">
                                        <h4 className="text-white text-xl font-bold">{product.name}</h4>
                                        <p className="text-white text-sm">Tap to view menu &amp; buy</p>
            <Link to="/menu" className="mt-3 px-4 py-2 bg-[#ff9800] text-white rounded-full font-bold shadow z-30">
                                            Show All
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* PM Modi Promo Section */}
            <motion.section className="modi-promo" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
                <div className="section-shell flex flex-col items-center gap-6">
                    <div className="modi-text text-center">
                        <p className="section-kicker">Featured Mention</p>
                        <h2>PM Modi Ji Featured Us !!</h2>
                        <p>Coverage from public fan pages brought attention to our <strong>Besan Barfi</strong>, highlighting the product quality and local appeal.</p>
                    </div>

                    <div className="video-wrapper w-full">
                        <div className="video-overlay-text">Click on Speaker Button</div>
                        <iframe
                            src="https://www.youtube.com/embed/QOZa-VSTyek?autoplay=1&mute=1&loop=1&playlist=QOZa-VSTyek&modestbranding=1"
                            loading="lazy"
                            title="PM Modi Ji featuring Panditan Di Hatti Besan Barfi"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </motion.section>

            {/* Reviews Section */}
            <motion.section className="reviews-section" id="customer-reviews" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
                <div className="section-shell reviews-shell">
                    <div className="reviews-header">
                        <p className="section-kicker">Social proof</p>
                        <h2>Customer Reviews</h2>
                        <p>Real words from people!</p>
                    </div>

                    {/* Carousel */}
                    <ReviewsCarousel items={[
                        { id: 1, name: 'Ramesh', rating: 5, image: 'images/1.avif', text: 'Best besan barfi I’ve ever had! Must try!' },
                        { id: 2, name: 'Priya', rating: 4, image: 'images/3.png', text: 'Pure, tasty local Himachali flavors – I love it!' },
                        { id: 3, name: 'Yuvraj', rating: 5, image: 'images/2.png', text: 'Whenever I visit Hamirpur, I never miss it!' },
                        { id: 4, name: 'Anka', rating: 5, image: 'images/4.png', text: 'Best traditional Himachali sweets particularly beasn ke barfi ,Service is excellent and very well behaved shop owner and staff !! Must try Beasan Ke Barfi !!' }
                    ]} />

                    <div className="reviews-cta">
                        <Link className="cta-btn" to="#">📝 Write a Review</Link>
                    </div>
                </div>
            </motion.section>
        </>
    );
}

export default Home;
