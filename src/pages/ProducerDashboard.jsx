import React from 'react';
import { DollarSign, Package, TrendingUp } from 'lucide-react';

const ProducerDashboard = () => {
  return (
    <div className="container mt-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>Welcome back, BeeHappy Farms!</h1>
          <p className="text-gray">Here is what's happening with your marketplace today.</p>
        </div>
        <button className="btn btn-primary">Add New Product</button>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Total Earnings (This Month)</p>
            <h3 style={{ fontSize: '1.5rem' }}>$2,450.00</h3>
          </div>
        </div>
        
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <Package size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Active Listings</p>
            <h3 style={{ fontSize: '1.5rem' }}>14 Items</h3>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#f59e0b', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Profile Views</p>
            <h3 style={{ fontSize: '1.5rem' }}>1,245</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Orders</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                <div>
                  <h4 className="font-semibold">Order #NX-{8493 + i}</h4>
                  <p className="text-gray" style={{ fontSize: '0.9rem' }}>3x Organic Honey</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-dark">${(37.50).toFixed(2)}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>En route</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}>
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon />
            <h2 style={{ fontSize: '1.25rem' }}>AI Demand Forecast</h2>
          </div>
          <p style={{ color: 'var(--gray-400)', marginBottom: '1.5rem' }}>
            Based on current market trends and local searches, our AI predicts the following demands for the next 7 days:
          </p>
          
          <div className="flex flex-col gap-4">
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Beeswax Candles</h4>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>+45% Demand</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>High volume of searches in your 10km radius. Consider listing if available.</p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Honeycomb Jars</h4>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>+20% Demand</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>Steady increase expected towards the weekend.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default ProducerDashboard;
