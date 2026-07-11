import React from 'react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, cartTotal } = useCart();
    const { businessInfo } = useData();

    // AnimatePresence will handle conditional rendering with animations.

    const handleWhatsAppOrder = () => {
        let message = "Hi! I want to order from Panditan Di Hatti:\n";
        cartItems.forEach(item => {
            message += `- ${item.name} x ${item.qty} ${item.unit} = ₹${item.price * item.qty}\n`;
        });
        message += `\nTotal: ₹${cartTotal}`;

        const whatsappUrl = `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-[300] flex justify-end"
                        onClick={() => setIsCartOpen(false)}
                        onTouchEnd={() => setIsCartOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                    <motion.aside
                        className="relative w-full max-w-sm bg-[#fffdf6] shadow-2xl flex flex-col h-full"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-[#ff9800]" /> Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition"><X size={24} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-500">₹{item.price} / {item.unit}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-md p-1 border border-gray-200 shadow-sm ml-2">
                                            <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`} className="p-1 bg-white hover:bg-gray-100 rounded-sm transition"><Minus size={16} className="text-gray-600" /></button>
                                            <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one more ${item.name}`} className="p-1 bg-white hover:bg-gray-100 rounded-sm transition"><Plus size={16} className="text-gray-600" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 p-4 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between items-center mb-4 font-bold text-xl text-gray-800">
                                    <span>Total:</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <button
                                    onClick={handleWhatsAppOrder}
                                    className="w-full bg-[#128C7E] text-white py-3.5 rounded-xl font-bold hover:bg-[#075E54] transition flex items-center justify-center gap-2 text-lg shadow-md"
                                >
                                    Proceed to Order
                                </button>
                            </div>
                        )}
                    </motion.aside>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CartDrawer;
