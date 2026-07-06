import React from 'react';
import { useData } from '../context/DataContext';

export default function OfferTicker() {
  const { announcements } = useData();
  const active = announcements.filter(a => a.active);
  const offer = active.length > 0 ? active[0] : { text: 'Get 10% off on Besan Barfi today!' };

  return (
    <div className="offer-ticker w-full bg-[#fff7ed] border-t border-b border-[#ffecd1] overflow-hidden">
      <style>{`
        @keyframes marqueeLR { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .offer-marquee { display: inline-block; padding-left: 100%; white-space: nowrap; animation: marqueeLR 14s linear infinite; }
        .offer-ticker:hover .offer-marquee { animation-play-state: paused; }
      `}</style>

      <div className="px-4 py-2 text-sm text-[#7a2b00] font-medium">
        <div className="offer-marquee">{offer.text}</div>
      </div>
    </div>
  );
}
