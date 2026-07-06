import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductModal from '../components/ProductModal';


function Menu() {
    const { products, categories } = useData();
    const visibleProducts = products.filter(p => p.visible);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('recommended');
    const [modalProduct, setModalProduct] = useState(null);

    const filtered = useMemo(() => {
        let list = visibleProducts.slice();
        if (selectedCategory !== 'All') list = list.filter(p => p.category === selectedCategory);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q));
        }
        if (sort === 'price_low') list.sort((a,b) => a.price - b.price);
        if (sort === 'price_high') list.sort((a,b) => b.price - a.price);
        return list;
    }, [visibleProducts, selectedCategory, query, sort]);

    return (
        <>
            {/* Hero Section */}
            <header className="hero">
                <Link to="/home">
                    <img src="images/LOGO.png" loading="lazy" className="logo" alt="Panditan Di Hatti Logo" />
                </Link>
                <h1>Our Specialties</h1>
                <p className="tagline">Taste the tradition of Himachal Pradesh</p>
            </header>

            {/* Menu Section */}
            <section className="menu text-center !pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-[#b14520]">Delicious Items</h2>
                            <p className="text-sm text-gray-600">Discover our specialties and seasonal treats.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dishes..." className="px-3 py-2 rounded-lg border border-gray-200 w-full sm:w-56" />
                            <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 w-full sm:w-auto">
                                <option value="recommended">Recommended</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-stretch">
                        {filtered.map(product => (
                            <ProductCard key={product.id} product={product} onView={(p) => setModalProduct(p)} />
                        ))}
                    </div>

                    {filtered.length === 0 && <p className="mt-8 text-gray-500">No items found. Try a different search or filter.</p>}
                </div>
            </section>

            {modalProduct && (
                <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
            )}
        </>
    );
}

export default Menu;
