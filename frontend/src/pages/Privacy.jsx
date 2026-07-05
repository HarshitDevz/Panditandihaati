import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export default function Privacy() {
  const { businessInfo } = useData();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold mb-4 text-[#b14520]">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">{businessInfo?.name || 'Panditan Di Hatti'} values your privacy. This page summarises how we handle data for this demo storefront. We do not sell personal data. Local storage is used to persist cart and admin settings for your convenience.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Data We Collect</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Order and cart data stored locally in your browser.</li>
          <li>Optional contact details when you submit Contact forms.</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">How We Use Data</h2>
        <p className="text-gray-700">We use data only to provide and improve the shopping experience (cart persistence, admin settings). No third-party tracking is enabled by default in this demo.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Contact</h2>
        <p className="text-gray-700">For privacy questions, contact: {businessInfo?.email || businessInfo?.phone || '98166-51543'}</p>

        <div className="mt-6">
          <Link to="/" className="inline-block px-4 py-2 bg-[#ff9800] text-white rounded-md">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
