import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import PremiumHero from '../components/PremiumHero';
import CategoryFilter from '../components/CategoryFilter';
import ReviewsCarousel from '../components/ReviewsCarousel';

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
                <div className="flex items-center justify-center gap-4 mt-4">
                    <CategoryFilter categories={[]} selected={selectedCategory} onSelect={setSelectedCategory} showAll={false} />
                </div>

                <motion.div className="menu-grid flex flex-wrap justify-center items-center gap-6 mt-8" variants={gridContainer} initial="hidden" animate="visible">
                    {products.filter(p => p.visible && (p.name && /besan barfi/i.test(p.name))).slice(0,1).map(product => (
                        <motion.div key={product.id} className="menu-item border-none !m-0 w-full max-w-sm mx-auto" variants={gridItem}>
                            <Link to="/menu.html">
                                <motion.div className="menu-img relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-sm mx-auto md:w-[320px] md:h-[200px]" whileHover={{ scale: 1.03 }}>
                                    <img src={product.image} loading="lazy" alt={product.name} className="w-full h-48 md:h-full object-cover transition duration-500 hover:scale-110 relative z-0" />
                                            <div className="overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-300 z-20">
                                            <h4 className="text-white text-xl font-bold">{product.name}</h4>
                                            <p className="text-white text-sm">Click to view menu & buy</p>
                                                <Link to="/menu.html" className="mt-3 px-4 py-2 bg-[#ff9800] text-white rounded-full font-bold shadow hidden md:inline-block z-30">
                                                    Show All
                                                </Link>
                                                <Link to="/menu.html" className="absolute bottom-3 right-3 bg-[#ff9800] text-white rounded-full px-3 py-2 font-bold shadow md:hidden z-30">Show All</Link>
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
            </section>
        </>
    );
}

export default Home;
