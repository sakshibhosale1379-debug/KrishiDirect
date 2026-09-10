import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Info } from 'lucide-react';

const products = [
  { id: 1, name: 'Organic Honey', producer: 'BeeHappy Farms', price: 12.50, image: 'https://images.unsplash.com/photo-1587049352847-4d4b1f6d39d9?w=500&q=80', recommended: true },
  { id: 2, name: 'Fresh Strawberries', producer: 'Valley Berries', price: 6.00, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80', recommended: true },
  { id: 3, name: 'Artisan Sourdough', producer: 'Crust Bakery', price: 8.50, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=500&q=80', recommended: false },
  { id: 4, name: 'Roasted Coffee Beans', producer: 'Morning Brew', price: 15.00, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80', recommended: false },
];

const ConsumerMarketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mt-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <h1 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>Fresh Discoveries</h1>
        <div style={{ background: 'var(--light)', padding: '0.5rem 1rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} className="text-primary" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>AI Recommendations Active</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="glass-card" style={{ padding: '1rem', cursor: 'pointer' }} onClick={() => setSelectedProduct(product)}>
            <div style={{ position: 'relative', height: '200px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {product.recommended && (
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Sparkles size={12} /> Top Pick
                </div>
              )}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
            <p className="text-gray" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>by {product.producer}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-dark" style={{ fontSize: '1.25rem' }}>${product.price.toFixed(2)}</span>
              <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-up" style={{ width: '90%', maxWidth: '500px', background: 'white' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Price Breakdown</h2>
            <p className="text-gray mb-4">NexusMarket guarantees complete transparency for <strong>{selectedProduct.name}</strong>.</p>
            
            <div style={{ background: 'var(--gray-100)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="flex justify-between mb-2">
                <span className="text-dark font-semibold">Producer Cut (85%)</span>
                <span className="text-primary font-bold">${(selectedProduct.price * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray" style={{ fontSize: '0.9rem' }}>
                <span>Logistics Optimization (10%)</span>
                <span>${(selectedProduct.price * 0.10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray" style={{ fontSize: '0.9rem' }}>
                <span>Platform Fee (5%)</span>
                <span>${(selectedProduct.price * 0.05).toFixed(2)}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--gray-200)', margin: '1rem 0' }}></div>
              <div className="flex justify-between">
                <span className="text-dark font-bold">Total Price</span>
                <span className="text-dark font-bold">${selectedProduct.price.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn w-full btn-primary" onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerMarketplace;
