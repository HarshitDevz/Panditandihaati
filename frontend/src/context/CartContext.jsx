import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true); // Auto open cart when adding
    };

    const updateQuantity = (id, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.qty + change;
                return { ...item, qty: newQty > 0 ? newQty : 0 };
            }
            return item;
        }).filter(item => item.qty > 0)); // Automatically remove if qty hits 0
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            updateQuantity,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
