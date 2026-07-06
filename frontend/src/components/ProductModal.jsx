import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { cartItems, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const inCart = cartItems.find(i => i.id === product.id);

  // Weight/unit selection
  const isWeight = typeof product.unit === 'string' && (product.unit.includes('kg') || product.unit.includes('g'));
  const presetWeights = [100, 250, 500, 1000]; // grams
  const [selectedWeight, setSelectedWeight] = useState(isWeight ? 1000 : null); // default 1kg
  const [customGrams, setCustomGrams] = useState('');

  const getMultiplier = (grams) => grams / 1000;

  const selectedGrams = isWeight ? (selectedWeight === 0 ? Number(customGrams || 0) : selectedWeight) : 1;

  const unitLabel = isWeight ? (selectedGrams >= 1000 ? `${selectedGrams/1000}kg` : `${selectedGrams}g`) : product.unit;

  const unitPrice = isWeight ? +(product.price * getMultiplier(selectedGrams)).toFixed(2) : product.price;

  const handleAdd = () => {
    // Build a cart item representing chosen weight/option
    if (isWeight && selectedGrams <= 0) return; // invalid

    const cartItem = {
      id: isWeight ? `${product.id}::${unitLabel}` : product.id,
      baseId: product.id,
      name: isWeight ? `${product.name} (${unitLabel})` : product.name,
      image: product.image,
      price: unitPrice,
      unit: unitLabel,
    };

    for (let i = 0; i < qty; i++) addToCart(cartItem);
    onClose();
  };

  return (
    <motion.div className="fixed inset-0 z-60 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${product.name} details`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} className="relative z-10 bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-4 p-4">
          <img src={product.image} alt={product.name} className="w-full md:w-48 h-48 object-cover rounded-lg" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X /></button>
            </div>
            <p className="mt-3 text-gray-700">{product.desc}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold text-[#b14520]">₹{isWeight ? unitPrice : product.price} <span className="text-sm text-gray-500">/ {isWeight ? unitLabel : product.unit}</span></div>
              </div>

              <div className="flex items-center justify-end gap-3">
                {isWeight && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1 flex-wrap">
                    {presetWeights.map(w => (
                      <button key={w} onClick={() => { setSelectedWeight(w); setCustomGrams(''); }} className={`px-3 py-1 rounded-full border whitespace-nowrap ${selectedWeight === w ? 'bg-[#ff9800] text-white' : 'bg-white text-gray-700'}`}>{w >= 1000 ? `${w/1000}kg` : `${w}g`}</button>
                    ))}
                    <button onClick={() => setSelectedWeight(0)} className={`px-3 py-1 rounded-full border whitespace-nowrap ${selectedWeight === 0 ? 'bg-[#ff9800] text-white' : 'bg-white text-gray-700'}`}>Custom</button>
                  </div>
                )}

                <div className="flex items-center bg-gray-100 rounded-full px-2">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 text-gray-700"><Minus /></button>
                  <div className="px-4 font-bold">{qty}</div>
                  <button onClick={() => setQty(q => q + 1)} className="p-2 text-gray-700"><Plus /></button>
                </div>
              </div>
            </div>

            {isWeight && selectedWeight === 0 && (
              <div className="mt-3">
                <label className="text-sm text-gray-600">Enter grams (e.g. 350)</label>
                <input type="number" value={customGrams} onChange={e => setCustomGrams(e.target.value)} placeholder="grams" className="mt-1 w-full px-3 py-2 border rounded" />
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button onClick={handleAdd} className="bg-gradient-to-br from-[#ff9800] to-[#ff7a2a] text-white px-4 py-2 rounded-xl flex items-center gap-2"><ShoppingBag /> {inCart ? 'Add more' : 'Add to cart'}</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
