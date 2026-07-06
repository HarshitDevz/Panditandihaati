import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { useData } from '../context/DataContext';

function ProductCard({ product, onView }) {
    const { cartItems, addToCart, updateQuantity } = useCart();
    const { announcements } = useData();
    const hasOffer = announcements && announcements.some(a => a.active);
    const cartItem = cartItems.find(item => item.id === product.id);

    return (
        <motion.div
            className="menu-item group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, rotate: -1 }}
            transition={{ duration: 0.25 }}
        >
            <div className="menu-img w-full h-40 sm:h-44 md:h-48 lg:h-56 relative overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105" />
                {hasOffer && announcements.filter(a => a.active).map(a => (
                  <div key={a.id} className="absolute top-2 left-2 bg-gradient-to-br from-[#ffb27a] to-[#ff9800] text-white text-xs font-bold px-2 py-1 rounded">{a.text.length > 20 ? '🔥 Offer' : a.text}</div>
                ))}
                <div className="absolute top-2 right-2">
                    <button onClick={(e) => { e.stopPropagation(); onView && onView(product); }} className="bg-white/95 text-gray-800 p-2 rounded-full shadow-sm hover:scale-105 transition">
                        View
                    </button>
                </div>
                <div className="overlay scale-100 relative translate-y-0 opacity-0 group-hover:opacity-100 p-3 bg-gradient-to-b from-transparent to-black/30 text-white">
                    <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                    <p className="text-sm line-clamp-2">{product.desc}</p>
                </div>
            </div>

            <div className="px-3 pb-4 pt-3 text-center flex-1 flex flex-col justify-end">
                <h3 className="font-semibold text-gray-800 text-md truncate mb-1">{product.name}</h3>
                <p className="font-bold text-[#b14520] text-lg mb-3">₹{product.price} <span className="text-sm text-gray-500 font-normal">/ {product.unit}</span></p>

                <div className="flex justify-center h-11">
                    {!cartItem ? (
                        <button
                            onClick={() => onView ? onView(product) : addToCart(product)}
                            className="w-full bg-gradient-to-br from-[#ff9800] to-[#ff7a2a] text-white font-bold rounded-xl hover:from-[#ff8f50] hover:to-[#ff6a00] transition shadow-md flex items-center justify-center gap-2 py-2"
                        >
                            <ShoppingBag size={18} /> Add to Cart
                        </button>
                    ) : (
                        <div className="w-full h-full flex items-center justify-between px-3 bg-[#fff3e0] border border-[#ff9800] rounded-lg">
                            <button onClick={() => updateQuantity(product.id, -1)} className="p-1.5 bg-white text-[#ff9800] rounded-md shadow-sm hover:bg-gray-50 transition"><Minus size={18} /></button>
                            <span className="font-bold text-gray-800 text-lg w-8 text-center">{cartItem.qty}</span>
                            <button onClick={() => updateQuantity(product.id, 1)} className="p-1.5 bg-white text-[#ff9800] rounded-md shadow-sm hover:bg-gray-50 transition"><Plus size={18} /></button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
