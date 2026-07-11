import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const defaultProducts = [
    {
        id: '1',
        name: '⭐ Besan Barfi',
        unit: '1kg',
        price: 320,
        image: 'images/BESAN BARFI.webp',
        desc: 'Famous all over Himachal. Soft, golden, full of rich flavor.',
        visible: true,
        category: 'Sweets'
    },
    {
        id: '2',
        name: 'Motichoor Laddoo',
        unit: '1kg',
        price: 280,
        image: 'images/Motichoor Laddoo.webp',
        desc: 'Spherical joy of every celebration!',
        visible: true,
        category: 'Sweets'
    },
    {
        id: '4',
        name: 'Rasgulla',
        unit: '1kg',
        price: 250,
        image: 'images/Rasgulla.webp',
        desc: 'Soft, spongy, syrupy sweet.',
        visible: true,
        category: 'Sweets'
    },
    {
        id: '3',
        name: 'Samosa',
        unit: 'piece',
        price: 15,
        image: 'images/Samosa.webp',
        desc: 'Crispy, spicy triangles of delight.',
        visible: true,
        category: 'Snacks'
    },
    {
        id: '5',
        name: 'Paneer Pakoda',
        unit: 'piece',
        price: 25,
        image: 'images/Paneer Pakoda.webp',
        desc: 'Fried cheese perfection.',
        visible: true,
        category: 'Snacks'
    },
];

const defaultBusinessInfo = {
    phone: '98166-51543',
    address: 'Near PG Degree College, Anu, Hamirpur, Himachal Pradesh 177001',
    openingHours: {
        Monday: '08:00 AM – 08:30 PM',
        Tuesday: '08:00 AM – 08:30 PM',
        Wednesday: '08:00 AM – 08:30 PM',
        Thursday: '08:00 AM – 08:30 PM',
        Friday: '08:00 AM – 08:30 PM',
        Saturday: '08:00 AM – 08:30 PM',
        Sunday: '08:00 AM – 08:30 PM',
    },
    aboutUs: 'Pandittan Di Hatti is a legendary sweets and snacks shop near PG Degree College in Hamirpur (Anu), Himachal Pradesh. With a proud history since the 1980s and over 1,250+ reviews averaging 4.5★, we’re a must-visit for both locals and tourists.',
    whatsappNumber: '919816651543',
    welcomeText: 'Welcome to Pandittan Di Hatti — Fresh sweets made with love!',
    maintenance: false,
    devToolsProtection: true
};

export function DataProvider({ children }) {
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('pdh_products');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Bust old PNG/JPG image cache — migrate to WebP
                const needsMigration = parsed.some(p => p.image && /\.(png|jpg|jpeg)$/i.test(p.image));
                if (needsMigration) {
                    localStorage.removeItem('pdh_products');
                    return defaultProducts;
                }
                return parsed;
            }
        } catch {}
        return defaultProducts;
    });

    const [businessInfo, setBusinessInfo] = useState(() => {
        const saved = localStorage.getItem('pdh_business_info');
        return saved ? JSON.parse(saved) : defaultBusinessInfo;
    });

    const [announcements, setAnnouncements] = useState(() => {
        const saved = localStorage.getItem('pdh_announcements');
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('pdh_categories');
        return saved ? JSON.parse(saved) : ['Sweets', 'Snacks', 'Drinks'];
    });

    useEffect(() => {
        localStorage.setItem('pdh_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('pdh_business_info', JSON.stringify(businessInfo));
    }, [businessInfo]);

    useEffect(() => {
        localStorage.setItem('pdh_announcements', JSON.stringify(announcements));
    }, [announcements]);

    useEffect(() => {
        localStorage.setItem('pdh_categories', JSON.stringify(categories));
    }, [categories]);

    return (
        <DataContext.Provider value={{
            products, setProducts,
            businessInfo, setBusinessInfo,
            announcements, setAnnouncements,
            categories, setCategories
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
