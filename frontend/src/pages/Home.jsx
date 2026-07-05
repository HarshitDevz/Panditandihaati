import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import PremiumHero from '../components/PremiumHero';
import CategoryFilter from '../components/CategoryFilter';

const heroVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const headingContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
};

const headingItem = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

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
                <div className="bg-[#ff9800] text-white py-2 overflow-hidden whitespace-nowrap relative z-[50]">
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
            <PremiumHero title="Panditan Di Hatti" subtitle={`Where Tradition Meets Taste — Since 1980 in Hamirpur (Anu), Himachal Pradesh`} ctaText="View Menu" />

            {/* About Section */}
            <section className="about">
                <h2>About Us</h2>
                <p>{businessInfo.aboutUs}</p>
                <img src="images/OWNER.png" loading="lazy" alt="Owner Photo" />
            </section>

            {/* Menu Section */}
            <section className="menu text-center">
                <h2>Our Specialties</h2>

                <CategoryFilter categories={[]} selected={selectedCategory} onSelect={setSelectedCategory} />

                <motion.div className="menu-grid flex flex-wrap justify-center items-center gap-6 mt-8" variants={gridContainer} initial="hidden" animate="visible">
                    {products.filter(p => p.visible && (selectedCategory === 'All' || p.category === selectedCategory)).map(product => (
                        <motion.div key={product.id} className="menu-item border-none !m-0" variants={gridItem}>
                            <Link to="/menu.html">
                                <motion.div className="menu-img relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300" whileHover={{ scale: 1.03 }}>
                                    <img src={product.image} loading="lazy" alt={product.name} className="w-full h-full object-cover transition duration-500 hover:scale-110" />
                                    <div className="overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                                        <h4 className="text-white text-xl font-bold">{product.name}</h4>
                                        <p className="text-white text-sm">Click to view menu & buy</p>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* PM Modi Promo Section */}
            <section className="modi-promo">
                <div className="modi-text">
                    <h2>PM Modi JI - Featured Us!</h2>
                    <p>PM Narendra Modi’s fan pages featured our <strong>Besan Barfi</strong> — and the love from India followed! 🇮🇳</p>
                </div>

                <div className="video-wrapper">
                    <div className="video-overlay-text">Click on Speaker Button</div>
                    <iframe
                        src="https://www.youtube.com/embed/QOZa-VSTyek?autoplay=1&mute=1&loop=1&playlist=QOZa-VSTyek&modestbranding=1"
                        loading="lazy"
                        title="PM Modi YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews-section" id="customer-reviews">
                <div className="reviews-header">
                    <h2>Customer Reviews</h2>
                    <p>Real words from people!</p>
                </div>

                <motion.div className="reviews-grid" variants={gridContainer} initial="hidden" animate="visible">
                    {/* Card 1 */}
                    <motion.article className="review-card" variants={fadeInUp}>
                        <img className="avatar" src="images/1.avif" alt="Photo of Ramesh" />
                        <h3 className="name">Ramesh</h3>
                        <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                        <p className="review">“Best besan barfi I’ve ever had! Must try!”</p>
                    </motion.article>

                    {/* Card 2 */}
                    <motion.article className="review-card" variants={fadeInUp}>
                        <img className="avatar" src="images/3.png" alt="Photo of Priya" />
                        <h3 className="name">Priya</h3>
                        <div className="stars" aria-label="5 out of 5 stars">★★★★</div>
                        <p className="review">“Pure, tasty local Himachali flavors – I love it!”</p>
                    </motion.article>

                    {/* Card 3 */}
                    <motion.article className="review-card" variants={fadeInUp}>
                        <img className="avatar" src="images/2.png" alt="Photo of Yuvraj" />
                        <h3 className="name">Yuvraj</h3>
                        <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                        <p className="review">“Whenever I visit Hamirpur, I never miss it!”</p>
                    </motion.article>

                    {/* Card 4 */}
                    <motion.article className="review-card" variants={fadeInUp}>
                        <img className="avatar" src="images/4.png" alt="Photo of Sonya Moroz" />
                        <h3 className="name">Anka</h3>
                        <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                        <p className="review">“Best traditional Himachali sweets particularly beasn ke barfi ,Service is excellent and very well behaved shop owner and staff !! Must try Beasan Ke Barfi !!”</p>
                    </motion.article>
                </motion.div>

                <div className="reviews-cta">
                    <Link className="cta-btn" to="#">📝 Write a Review</Link>
                </div>
            </section>
        </>
    );
}

export default Home;
