import React, { useState } from 'react';
import { Map, Truck, Navigation, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const PARTNERS = ['SpeedShip Express', 'QuickMove Cargo', 'AgriExpress Rural Fleet'];

const LogisticsDashboard = () => {
  const { orders, assignDeliveryPartner, advanceDeliveryStep } = useData();
  const [selectedPartner, setSelectedPartner] = useState(PARTNERS[0]);
  const [toast, setToast] = useState('');

  const activeDeliveries = orders.filter(o => o.status !== 'Cancelled');
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const inTransitCount = orders.filter(o => o.status === 'Processing' || o.status === 'Out for Delivery' || o.status === 'Accepted').length;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAssign = (orderId) => {
    assignDeliveryPartner(orderId, selectedPartner);
    showToast(`Assigned ${selectedPartner} to order ${orderId}!`);
  };

  const handleAdvance = (orderId, nextStatusLabel) => {
    advanceDeliveryStep(orderId);
    showToast(`Order ${orderId} moved to ${nextStatusLabel}!`);
  };

  return (
    <div className="container mt-8 animate-fade-up" style={{ paddingBottom: '3rem' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#0f172a', color: 'white', padding: '0.85rem 1.4rem', borderRadius: '0.75rem', fontWeight: 700, zIndex: 9999, boxShadow: '0 6px 24px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} color="#10b981" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--dark)' }}>Smart Route & Logistics Hub</h1>
          <p className="text-gray">AI-Optimized Farm-to-Door Delivery Management & Clustered Route Dispatch</p>
        </div>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Navigation size={18} />
          <span>Live GPS Fleet Active</span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '0.75rem', color: 'white' }}>
            <Truck size={26} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Shipments</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{inTransitCount} in Transit</h3>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '0.75rem', color: 'white' }}>
            <Map size={26} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Distance Saved (AI Clustered)</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>184 km today</h3>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#10b981', padding: '1rem', borderRadius: '0.75rem', color: 'white' }}>
            <CheckCircle size={26} />
          </div>
          <div>
            <p className="text-gray" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Delivered to Consumers</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{deliveredCount} Completed</h3>
          </div>
        </div>
      </div>

      {/* Map Simulation & Route Cluster UI */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Left 2-cols: Live Cluster Route Simulation */}
        <div className="col-span-2 glass-card" style={{ padding: 0, overflow: 'hidden', height: '420px', position: 'relative', background: '#e2e8f0', borderRadius: '1rem' }}>
          <div style={{ width: '100%', height: '100%', opacity: 0.6, backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.96)', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', maxWidth: '380px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 className="font-bold flex items-center gap-2" style={{ color: 'var(--dark)' }}>
                <Navigation size={18} className="text-primary"/> AI Clustered Batch #MH-401
              </h4>
              <span style={{ background: '#d1fae5', color: '#065f46', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                Batch Optimized
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }}></div>
                <span><strong>Pickup:</strong> BeeHappy Farms (Nashik Mandi Hub)</span>
              </div>
              <div style={{ borderLeft: '2px dashed var(--gray-400)', height: '18px', marginLeft: '5px' }}></div>
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--secondary)', flexShrink: 0 }}></div>
                <span><strong>Drop 1:</strong> Pune Suburban East (3 Consumer Drops)</span>
              </div>
              <div style={{ borderLeft: '2px dashed var(--gray-400)', height: '18px', marginLeft: '5px' }}></div>
              <div className="flex items-center gap-2 text-sm">
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }}></div>
                <span><strong>Drop 2:</strong> Mumbai Metro Corridor (2 Consumer Drops)</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>Batch ETA: <strong>3.5 hours</strong></span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>Saves 38% fuel</span>
            </div>
          </div>
        </div>

        {/* Right 1-col: Partner Dispatch Selector */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>Logistics Dispatch</h3>
            <p className="text-gray" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Assign certified cold-chain and express fleets to regional farmer orders.
            </p>

            <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              Active Logistics Partner
            </label>
            <select
              value={selectedPartner}
              onChange={e => setSelectedPartner(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.9rem', marginBottom: '1.25rem' }}
            >
              {PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.82rem', color: '#475569', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span>Fleet Vehicles:</span>
                <strong>24 Active Vans</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span>Cold Chain Temp:</span>
                <strong>4°C - 8°C Monitored</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>On-Time Rate:</span>
                <strong style={{ color: '#10b981' }}>98.4%</strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#065f46', textAlign: 'center', fontWeight: 600 }}>
            ⚡ Real-time synchronization active across Farmer and Consumer portals
          </div>
        </div>
      </div>

      {/* Orders In Fulfillment Table */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--dark)' }}>Live Orders in Logistics Lifecycle</h3>
            <p className="text-gray" style={{ fontSize: '0.85rem' }}>Update shipment milestones. Status updates propagate to customer and farmer immediately.</p>
          </div>
          <span style={{ background: '#d1fae5', color: '#065f46', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.82rem' }}>
            {activeDeliveries.length} Total Orders
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Order ID', 'Harvest Produce', 'Farmer / Farm', 'Delivery To', 'Fleet Partner', 'Current Status', 'Logistics Action'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeDeliveries.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.product}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem', color: '#475569' }}>{o.farmer || o.farm}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600 }}>{o.buyer}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{o.buyerAddress}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem', fontWeight: 600, color: o.partner === 'Pending Assignment' ? '#ef4444' : '#0284c7' }}>
                    {o.partner || 'Pending Assignment'}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{
                      background: o.status === 'Delivered' ? '#d1fae5' : o.status === 'Out for Delivery' ? '#ede9fe' : o.status === 'Processing' ? '#fef3c7' : '#dbeafe',
                      color: o.status === 'Delivered' ? '#065f46' : o.status === 'Out for Delivery' ? '#6b21a8' : o.status === 'Processing' ? '#92400e' : '#1e40af',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    {(!o.partner || o.partner === 'Pending Assignment') && o.status !== 'Delivered' ? (
                      <button
                        onClick={() => handleAssign(o.id)}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        Assign Partner
                      </button>
                    ) : o.status === 'New' || o.status === 'Accepted' || o.status === 'Processing' ? (
                      <button
                        onClick={() => handleAdvance(o.id, 'Out for Delivery')}
                        style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        🚚 Mark Out for Delivery
                      </button>
                    ) : o.status === 'Out for Delivery' ? (
                      <button
                        onClick={() => handleAdvance(o.id, 'Delivered')}
                        style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        ✓ Mark Delivered
                      </button>
                    ) : (
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
