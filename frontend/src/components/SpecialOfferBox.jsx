import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

export default function SpecialOfferBox() {
  const { announcements, businessInfo } = useData();
  if (businessInfo && businessInfo.maintenance) return null;
  const active = announcements.filter(a => a.active);
  const offer = active.length > 0 ? active[0] : { text: 'Get 10% off on Besan Barfi today!', cta: 'MENU' };
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Ensure the box starts collapsed on page load (avoid resuming an old state)
  useEffect(() => {
    try {
      // If user previously hid the offer, don't show it
      const hidden = localStorage.getItem('pdh_offer_hidden');
      if (hidden === '1') {
        setVisible(false);
        return;
      }
      // ensure collapsed on load
      localStorage.removeItem('pdh_offer_open');
    } catch (e) {
      // ignore
    }
    setOpen(false);
  }, []);

  // Listen for other tabs hiding the offer and sync visibility
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'pdh_offer_hidden') {
        if (e.newValue === '1') setVisible(false);
        else setVisible(true);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleOrder = () => {
    // Navigate to the menu page instead of opening WhatsApp
    window.location.href = '/menu.html';
  };

  return (
    <div>
      {/* Don't render at all if user hid the offer permanently */}
      {!visible ? null : (
      <> 
      {/* Collapsed floating button when closed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            className="fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full bg-[#ff9800] text-white flex items-center justify-center shadow-lg"
            aria-label="Open offers"
          >
            <span className="font-bold">!</span>
            <span className="absolute -top-1 -right-1 bg-white text-[#ff9800] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">1</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded offer box */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="fixed right-6 bottom-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-80"
            >
              <div className="p-3 flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ffb27a] to-[#ff9800] rounded-lg flex items-center justify-center text-white font-bold">10%</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">Special Offer</h4>
                    <button onClick={() => setOpen(o => !o)} className="text-xs text-gray-500 hover:text-gray-700">{open ? 'Hide' : 'View'}</button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{offer.text}</p>
                    <div className="mt-3 flex gap-2">
                    <button onClick={handleOrder} className="flex-1 bg-[#ff9800] text-white py-2 rounded-md text-sm font-semibold">{offer.cta || 'Order'}</button>
                    <button onClick={() => { setOpen(false); setVisible(false); try { localStorage.setItem('pdh_offer_hidden','1'); } catch {} }} className="px-3 py-2 bg-gray-100 rounded-md text-sm">Close</button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-700">
                    <p className="mb-2">Offer details: {offer.text}</p>
                    <p className="text-xs text-gray-500">Limited time. Terms apply.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
}
