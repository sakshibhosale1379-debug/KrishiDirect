import React from 'react';
import { Map, Truck, Navigation, CheckCircle, Clock } from 'lucide-react';

const LogisticsDashboard = () => {
  return (
    <div className="container mt-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>Logistics & Routes</h1>
          <p className="text-gray">AI-Optimized Route Management for Fast Delivery</p>
        </div>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navigation size={20} />
          <span className="font-semibold">Live Tracking Active</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <Truck size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Active Deliveries</p>
            <h3 style={{ fontSize: '1.5rem' }}>24 Routes</h3>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <Map size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Distance Saved (AI)</p>
            <h3 style={{ fontSize: '1.5rem' }}>142 km today</h3>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#10b981', padding: '1rem', borderRadius: '0.5rem', color: 'white' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>Successful Deliveries</p>
            <h3 style={{ fontSize: '1.5rem' }}>89 Today</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 glass-card" style={{ padding: 0, overflow: 'hidden', height: '400px', position: 'relative', background: '#e2e8f0' }}>
          {/* Mock Map Background */}
          <div style={{ width: '100%', height: '100%', opacity: 0.5, backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          
          {/* Overlay Map UI */}
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}>
            <h4 className="font-bold mb-2 flex items-center gap-2"><Navigation size={16} className="text-primary"/> Route #L-492</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                <span>BeeHappy Farms (Pickup)</span>
              </div>
              <div style={{ borderLeft: '2px dashed var(--gray-400)', height: '20px', marginLeft: '4px' }}></div>
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                <span>Downtown Sector (Drop 1)</span>
              </div>
              <div style={{ borderLeft: '2px dashed var(--gray-400)', height: '20px', marginLeft: '4px' }}></div>
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                <span>Westside Area (Drop 2)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Upcoming optimized routes</h2>
          
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.5)' }}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-dark">Route #L-{500 + i}</h4>
                <span className="text-xs font-bold" style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>AI Grouped</span>
              </div>
              <p className="text-sm text-gray mb-2">3 Orders clustered • Saves 15km</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-sm text-gray">
                  <Clock size={14} /> Est. 45 mins
                </div>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Assign</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
