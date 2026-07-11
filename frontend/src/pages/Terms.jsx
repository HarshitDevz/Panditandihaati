import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export default function Terms() {
  const { businessInfo } = useData();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold mb-4 text-[#b14520]">Terms of Service</h1>
        <p className="text-gray-700 mb-4">These are the basic Terms of Service for {businessInfo?.name || 'Pandittan Di Hatti'}. This site is a demo storefront. Orders placed are fulfilled locally by the shop and are subject to availability.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Acceptable Use</h2>
        <p className="text-gray-700">Users must not abuse the site or submit spammy content.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Liability</h2>
        <p className="text-gray-700">The site provides product info for convenience; the shop is responsible for fulfillment.</p>

        <div className="mt-6">
          <Link to="/" className="inline-block px-4 py-2 bg-[#ff9800] text-white rounded-md">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
