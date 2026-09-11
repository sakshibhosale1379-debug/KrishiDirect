import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, Package, ShoppingBag, TrendingUp, DollarSign,
  CreditCard, Truck, Bell, User, LogOut, Menu, X, Edit3, Trash2, CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';

const NAV_ITEMS = [
  { key: 'overview',   label: 'Overview',           icon: <LayoutDashboard size={18}/> },
  { key: 'add',        label: 'Add Product',         icon: <PlusCircle size={18}/> },
  { key: 'products',   label: 'My Products',         icon: <Package size={18}/> },
  { key: 'orders',     label: 'Orders',              icon: <ShoppingBag size={18}/> },
  { key: 'demand',     label: 'Demand Insights',     icon: <TrendingUp size={18}/> },
  { key: 'price',      label: 'Price Insights',      icon: <DollarSign size={18}/> },
  { key: 'earnings',   label: 'Earnings & Payments', icon: <CreditCard size={18}/> },
  { key: 'logistics',  label: 'Delivery/Logistics',  icon: <Truck size={18}/> },
  { key: 'notifs',     label: 'Notifications',       icon: <Bell size={18}/> },
  { key: 'profile',    label: 'Profile',             icon: <User size={18}/> },
];

const STATUS_COLORS = {
  New: '#3b82f6', Accepted: '#10b981', Processing: '#f59e0b',
  'Out for Delivery': '#8b5cf6', Delivered: '#059669', Cancelled: '#ef4444',
};

const card = { background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.4)', marginBottom: '1.5rem' };
const inputS = { width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', background: '#f8fafc', boxSizing: 'border-box' };
const labelS = { fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '0.3rem' };

/* ───────────── 1. OVERVIEW ───────────── */
const Overview = ({ products, orders, currentUser }) => {
  const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + (Number(o.price) || 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const stats = [
    { label: 'Total Products', value: products.length, color: '#10b981', icon: '📦' },
    { label: 'Active Orders', value: activeOrders, color: '#3b82f6', icon: '📋' },
    { label: 'Total Sales', value: `₹${totalSales.toLocaleString('en-IN')}`, color: '#f59e0b', icon: '💹' },
    { label: 'Estimated Earnings', value: `₹${Math.round(totalSales * 0.85).toLocaleString('en-IN')}`, color: '#6366f1', icon: '💰' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: '#0f172a' }}>
        Welcome back, {currentUser.name || 'Farmer'}! 👋
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        {currentUser.farm || 'BeeHappy Farms'} · {currentUser.location || 'Nashik, Maharashtra'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, padding: '1.25rem', marginBottom: 0, borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#0f172a' }}>Recent Orders</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{orders.length} total</span>
          </div>
          {orders.slice(0, 4).map(o => (
            <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{o.product} • {o.buyer}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: '#10b981', fontSize: '0.9rem' }}>₹{Number(o.price).toLocaleString('en-IN')}</div>
                <span style={{ background: (STATUS_COLORS[o.status] || '#94a3b8') + '22', color: STATUS_COLORS[o.status] || '#94a3b8', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>No orders yet.</p>}
        </div>

        <div style={{ ...card, background: 'linear-gradient(135deg,#1e293b,#0f172a)', color: 'white' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✨ AI Demand Forecast</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>Real-time predictions for next 7 days in your regional market.</p>
          {[
            { name: 'Raw Organic Honey', change: '+45%', note: 'Surge in regional health food searches' },
            { name: 'Fresh Strawberries', change: '+30%', note: 'High weekend demand in urban centers' },
            { name: 'Beeswax Candles', change: '+20%', note: 'Festive season upcoming demand' },
          ].map(d => (
            <div key={d.name} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.85rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>{d.change}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>{d.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────────── 2. ADD PRODUCT ───────────── */
const AddProduct = ({ onAdd, currentUser }) => {
  const [form, setForm] = useState({
    name: '',
    category: 'Vegetables',
    qty: '',
    price: '',
    harvest: new Date().toISOString().split('T')[0],
    location: currentUser.location || 'Nashik, Maharashtra',
    freshness: '3 days'
  });
  const [success, setSuccess] = useState(false);
  const cats = ['Vegetables', 'Fruits', 'Grains', 'Dairy & Honey', 'Others'];

  const handle = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.qty || !form.price) return;
    onAdd({
      ...form,
      price: Number(form.price),
      qty: Number(form.qty),
      farmer: currentUser.name || 'Farmer',
      farm: currentUser.farm || 'KrishiDirect Farm',
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    setForm({
      name: '',
      category: 'Vegetables',
      qty: '',
      price: '',
      harvest: new Date().toISOString().split('T')[0],
      location: currentUser.location || 'Nashik, Maharashtra',
      freshness: '3 days'
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Add New Produce to Marketplace</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>List your farm harvest directly to consumers. Products sync immediately to the consumer marketplace.</p>
      
      <div style={{ ...card, maxWidth: '650px' }}>
        {success && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} /> Produce listed successfully! Visible to all consumers.
          </div>
        )}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelS}>Produce / Product Name</label>
            <input type="text" value={form.name} onChange={handle('name')} placeholder="e.g. Organic Kashmiri Walnuts" style={inputS} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelS}>Quantity Available (units/kg)</label>
              <input type="number" min="1" value={form.qty} onChange={handle('qty')} placeholder="e.g. 50" style={inputS} required />
            </div>
            <div>
              <label style={labelS}>Price per Unit (₹ INR)</label>
              <input type="number" min="1" value={form.price} onChange={handle('price')} placeholder="e.g. 350" style={inputS} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelS}>Category</label>
              <select value={form.category} onChange={handle('category')} style={inputS}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelS}>Shelf Life / Freshness</label>
              <input type="text" value={form.freshness} onChange={handle('freshness')} placeholder="e.g. 5 days, 30 days" style={inputS} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelS}>Harvest Date</label>
              <input type="date" value={form.harvest} onChange={handle('harvest')} style={inputS} />
            </div>
            <div>
              <label style={labelS}>Farm Location</label>
              <input type="text" value={form.location} onChange={handle('location')} placeholder="e.g. Nashik, Maharashtra" style={inputS} />
            </div>
          </div>

          <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
            + Publish Produce to Marketplace
          </button>
        </form>
      </div>
    </div>
  );
};

/* ───────────── 3. MY PRODUCTS & EDIT MODAL ───────────── */
const MyProducts = ({ products, onDelete, onUpdate }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', qty: '', category: '', stock: '' });

  const startEdit = (p) => {
    setEditingProduct(p);
    setEditForm({ name: p.name, price: p.price, qty: p.qty, category: p.category, stock: p.stock });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdate(editingProduct.id, {
      name: editForm.name,
      price: Number(editForm.price),
      qty: Number(editForm.qty),
      category: editForm.category,
      stock: editForm.stock,
    });
    setEditingProduct(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a' }}>My Farm Listings</h2>
          <p style={{ color: '#64748b' }}>Manage your live inventory, update pricing, and track stock.</p>
        </div>
        <span style={{ background: '#d1fae5', color: '#065f46', fontWeight: 700, padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.85rem' }}>
          {products.length} Active Listings
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ ...card, marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '0.5rem' }}>{p.image || '🌿'}</div>
            <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>{p.category} · {p.location}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.2rem' }}>₹{Number(p.price).toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '0.78rem', background: p.stock === 'In Stock' ? '#d1fae5' : '#fef3c7', color: p.stock === 'In Stock' ? '#065f46' : '#92400e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 700 }}>
                {p.stock}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>Available: <strong>{p.qty} units</strong></p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                onClick={() => startEdit(p)}
                style={{ flex: 1, padding: '0.5rem', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '0.4rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Edit3 size={15} /> Edit
              </button>
              <button
                onClick={() => { if (window.confirm(`Delete ${p.name}?`)) onDelete(p.id); }}
                style={{ flex: 1, padding: '0.5rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '0.4rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
          No products listed yet. Click "Add Product" to add your first harvest!
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ ...card, width: '100%', maxWidth: '480px', margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#0f172a' }}>Edit Produce Listing</h3>
              <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}>✕</button>
            </div>
            <form onSubmit={saveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={labelS}>Product Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  style={inputS}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelS}>Price (₹ INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.price}
                    onChange={e => setEditForm(p => ({ ...p, price: e.target.value }))}
                    style={inputS}
                    required
                  />
                </div>
                <div>
                  <label style={labelS}>Quantity (units)</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.qty}
                    onChange={e => setEditForm(p => ({ ...p, qty: e.target.value }))}
                    style={inputS}
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelS}>Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
                    style={inputS}
                  >
                    {['Vegetables', 'Fruits', 'Grains', 'Dairy & Honey', 'Others'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelS}>Stock Status</label>
                  <select
                    value={editForm.stock}
                    onChange={e => setEditForm(p => ({ ...p, stock: e.target.value }))}
                    style={inputS}
                  >
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: '0.75rem', background: '#f1f5f9', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ───────────── 4. ORDERS & WORKFLOW ───────────── */
const Orders = ({ orders, onUpdateStatus }) => {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'New', 'Accepted', 'Processing', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: '#0f172a' }}>Orders Management</h2>
      <p style={{ color: '#64748b', marginBottom: '1.25rem' }}>Accept new orders and move them to fulfillment. Updates sync to consumer and logistics.</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{ padding: '0.45rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem', background: filter === t ? '#0f172a' : '#f1f5f9', color: filter === t ? 'white' : '#64748b', transition: 'all 0.2s' }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Order ID', 'Product Details', 'Qty', 'Customer', 'Amount (₹)', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>{o.product}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.qty}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: 600 }}>{o.buyer}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{o.buyerAddress || 'Standard Delivery'}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#10b981' }}>₹{Number(o.price).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>{o.date}</td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{ background: (STATUS_COLORS[o.status] || '#94a3b8') + '22', color: STATUS_COLORS[o.status] || '#94a3b8', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    {o.status === 'New' && (
                      <button
                        onClick={() => onUpdateStatus(o.id, 'Accepted')}
                        style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem', boxShadow: '0 2px 6px rgba(16,185,129,0.3)' }}
                      >
                        ✓ Accept
                      </button>
                    )}
                    {o.status === 'Accepted' && (
                      <button
                        onClick={() => onUpdateStatus(o.id, 'Processing')}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem', boxShadow: '0 2px 6px rgba(59,130,246,0.3)' }}
                      >
                        ⚡ Process Order
                      </button>
                    )}
                    {o.status === 'Processing' && (
                      <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700 }}>In Logistics</span>
                    )}
                    {(o.status === 'Delivered' || o.status === 'Cancelled' || o.status === 'Out for Delivery') && (
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2.5rem' }}>No {filter} orders found.</div>}
      </div>
    </div>
  );
};

/* ───────────── 5. DEMAND INSIGHTS ───────────── */
const DemandInsights = () => {
  const items = [
    { name: 'Raw Organic Honey', demand: 85, change: '+45%', recommended: 40, reason: 'High search volume in 15km radius. Seasonal wellness demand.' },
    { name: 'Fresh Mahabaleshwar Strawberries', demand: 75, change: '+30%', recommended: 50, reason: 'Direct consumer orders rising across suburban Pune/Mumbai.' },
    { name: 'Handcrafted Beeswax Candles', demand: 65, change: '+20%', recommended: 25, reason: 'Gifting and artisanal decor trend this month.' },
    { name: 'Pure A2 Gir Cow Milk', demand: 90, change: '+60%', recommended: 60, reason: 'High recurring subscription potential in your cluster.' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>AI Demand Insights</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>AI-predicted consumer demand for the next 7 days based on search queries, seasonality, and regional orders.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {items.map(item => (
          <div key={item.name} style={{ ...card, marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>{item.reason}</p>
              </div>
              <span style={{ background: '#d1fae5', color: '#065f46', padding: '0.25rem 0.65rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', marginLeft: '0.75rem' }}>{item.change} Demand</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>
                <span>Demand Surge</span><span>{item.demand}%</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${item.demand}%`, height: '100%', background: 'linear-gradient(90deg,#10b981,#3b82f6)', borderRadius: '999px', transition: 'width 0.5s' }} />
              </div>
            </div>
            <div style={{ background: '#f0fdf4', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#065f46' }}>✅ Recommended listing batch</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>{item.recommended} units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────── 6. PRICE INSIGHTS ───────────── */
const PriceInsights = ({ products, onUpdatePrice }) => {
  const [toast, setToast] = useState('');

  const comparisons = [
    { name: 'Raw Organic Honey', marketAvg: 380, suggested: 360, trend: 'up' },
    { name: 'Fresh Mahabaleshwar Strawberries', marketAvg: 210, suggested: 195, trend: 'up' },
    { name: 'Handcrafted Beeswax Candles', marketAvg: 260, suggested: 250, trend: 'stable' },
    { name: 'Farm Fresh Baby Spinach', marketAvg: 45, suggested: 42, trend: 'down' },
  ];

  const handleApply = (itemName, suggestedPrice) => {
    const target = products.find(p => p.name.toLowerCase().includes(itemName.toLowerCase()));
    if (target) {
      onUpdatePrice(target.id, { price: suggestedPrice });
      setToast(`Updated ${target.name} price to ₹${suggestedPrice}!`);
      setTimeout(() => setToast(''), 2500);
    } else {
      setToast(`Listing for ${itemName} updated in forecast.`);
      setTimeout(() => setToast(''), 2500);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>AI Price Insights</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Compare your farm pricing with current mandi & retail averages to maximize revenue.</p>
      
      {toast && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 700 }}>
          ✅ {toast}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comparisons.map(d => {
          const matchedProduct = products.find(p => p.name.toLowerCase().includes(d.name.toLowerCase()));
          const currentPrice = matchedProduct ? matchedProduct.price : d.suggested;

          return (
            <div key={d.name} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontWeight: 700, color: '#0f172a', minWidth: '180px' }}>{d.name}</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Your Price</div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>₹{currentPrice}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Retail Market Avg</div>
                    <div style={{ fontWeight: 800, color: '#64748b', fontSize: '1.1rem' }}>₹{d.marketAvg}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>AI Suggested</div>
                    <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>₹{d.suggested}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Trend</div>
                    <div style={{ fontSize: '1.25rem' }}>{d.trend === 'up' ? '📈' : d.trend === 'down' ? '📉' : '📊'}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleApply(d.name, d.suggested)}
                  style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.88rem' }}
                >
                  Apply Suggested Price
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ───────────── 7. EARNINGS & PAYMENTS ───────────── */
const Earnings = ({ orders }) => {
  const completedOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalGross = completedOrders.reduce((s, o) => s + (Number(o.price) || 0), 0);
  const farmerCut = Math.round(totalGross * 0.85);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pendingAmount = Math.round(pendingOrders.reduce((s, o) => s + (Number(o.price) || 0), 0) * 0.85);

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Earnings & Payments</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Direct producer payouts (85% net split). Funds are disbursed instantly upon successful delivery.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Net Payout', value: `₹${farmerCut.toLocaleString('en-IN')}`, sub: 'Direct to Bank (85% net)', color: '#10b981' },
          { label: 'Gross Marketplace Sales', value: `₹${totalGross.toLocaleString('en-IN')}`, sub: `${completedOrders.length} transactions`, color: '#3b82f6' },
          { label: 'Pending Settlement', value: `₹${pendingAmount.toLocaleString('en-IN')}`, sub: `${pendingOrders.length} orders in transit`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ ...card, marginBottom: 0 }}>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{s.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, margin: '0.25rem 0' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Transaction History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Order ID', 'Produce', 'Customer', 'Gross (₹)', 'Farmer Cut (85%)', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.product}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.buyer}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>₹{Number(o.price).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#10b981' }}>₹{Math.round(o.price * 0.85).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{ background: o.status === 'Delivered' ? '#d1fae5' : '#fef3c7', color: o.status === 'Delivered' ? '#065f46' : '#92400e', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {o.status === 'Delivered' ? 'Settled' : 'Pending Delivery'}
                    </span>
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

/* ───────────── 8. LOGISTICS ───────────── */
const Logistics = ({ orders }) => {
  const activeShipments = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const stepIdx = (status) => ['New', 'Accepted', 'Processing', 'Out for Delivery', 'Delivered'].indexOf(status);

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Delivery & Logistics Status</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Active shipments picked up from your farm and en route to consumers.</p>

      {activeShipments.map(del => {
        const currentIdx = stepIdx(del.status);
        const steps = ['Order Placed', 'Accepted by Farm', 'Pickup Scheduled', 'Out for Delivery', 'Delivered'];

        return (
          <div key={del.id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{del.id} — {del.product}</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Buyer: <strong>{del.buyer}</strong> · Partner: <strong>{del.partner || 'SpeedShip Express'}</strong> · ETA: {del.eta || '2 Days'}
                </p>
              </div>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.35rem 0.85rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
                {del.status}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {steps.map((step, i) => {
                const done = i <= (currentIdx === -1 ? 0 : currentIdx);
                return (
                  <React.Fragment key={step}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '90px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? '#10b981' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                        {done ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: done ? '#10b981' : '#94a3b8', textAlign: 'center', fontWeight: done ? 700 : 400 }}>{step}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ flex: 1, height: '3px', background: i < currentIdx ? '#10b981' : '#e2e8f0', margin: '0 0.25rem', marginBottom: '1.25rem', minWidth: '40px' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}

      {activeShipments.length === 0 && (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
          All active farm shipments have been completed!
        </div>
      )}
    </div>
  );
};

/* ───────────── 9. NOTIFICATIONS ───────────── */
const Notifications = () => {
  const notifs = [
    { icon: '🛒', title: 'New Customer Order Received', msg: 'Priya Sharma placed an order for Raw Organic Honey × 3', time: '10 min ago', type: 'order', unread: true },
    { icon: '💰', title: 'Price Suggestion Updated', msg: 'Mahabaleshwar Strawberries market price moved up by 15%', time: '1 hr ago', type: 'price', unread: true },
    { icon: '📈', title: 'Regional Demand Surge', msg: 'Organic Honey queries surged 45% in your direct delivery radius', time: '3 hr ago', type: 'demand', unread: true },
    { icon: '✅', title: 'Order Completed', msg: 'KD-8481 Baby Spinach was delivered successfully to Priya Sharma', time: 'Yesterday', type: 'order', unread: false },
    { icon: '⚠️', title: 'Low Stock Alert', msg: 'Artisan Sourdough stock is below 15 units', time: '2 days ago', type: 'stock', unread: false },
  ];
  const colors = { order: '#3b82f6', price: '#f59e0b', demand: '#10b981', stock: '#ef4444' };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Farm Notifications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ ...card, marginBottom: 0, display: 'flex', gap: '1rem', alignItems: 'flex-start', borderLeft: n.unread ? `4px solid ${colors[n.type]}` : '4px solid transparent', background: n.unread ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)' }}>
            <div style={{ fontSize: '1.75rem' }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{n.title}</h4>
                {n.unread && <span style={{ background: colors[n.type], color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>New</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.2rem 0' }}>{n.msg}</p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────── 10. PROFILE ───────────── */
const Profile = ({ currentUser, onUpdateProfile, onLogout }) => {
  const [form, setForm] = useState({
    name:     currentUser.name     || '',
    email:    currentUser.email    || '',
    farm:     currentUser.farm     || '',
    location: currentUser.location || '',
    phone:    currentUser.phone    || '',
  });
  const [saved, setSaved] = useState(false);

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const saveProfile = () => {
    onUpdateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Farmer Profile & Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left summary card */}
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem' }}>🧑‍🌾</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
              {form.name || 'Farmer Ravi'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {form.farm || 'BeeHappy Farms'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['📧 Email',    form.email    || '—'],
              ['📍 Farm Location', form.location || '—'],
              ['📞 Contact',    form.phone    || '—'],
              ['📅 Member Since', currentUser.joined || 'Jan 2024'],
              ['🌾 Account Type', 'Direct Producer / Verified Farmer'],
              ['⭐ Farmer Rating', '4.9 / 5.0 (Trusted Producer)'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{k}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right edit form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={card}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Edit Farm Details</h3>
            {saved && (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 700, fontSize: '0.88rem' }}>
                ✅ Profile details saved and updated everywhere!
              </div>
            )}
            {[
              { label: 'Full Name', field: 'name', type: 'text', placeholder: 'e.g. Ravi Sharma' },
              { label: 'Farm Name', field: 'farm', type: 'text', placeholder: 'e.g. BeeHappy Farms' },
              { label: 'Email Address', field: 'email', type: 'email', placeholder: 'ravi@example.com' },
              { label: 'Farm Location', field: 'location', type: 'text', placeholder: 'e.g. Nashik, Maharashtra' },
              { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: 'e.g. 9876543210' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ marginBottom: '0.85rem' }}>
                <label style={labelS}>{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={handle(field)}
                  placeholder={placeholder}
                  style={inputS}
                />
              </div>
            ))}
            <button
              onClick={saveProfile}
              style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem', width: '100%' }}
            >
              Save Changes
            </button>
          </div>

          <button
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.85rem', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
          >
            <LogOut size={18} /> Logout from Farmer Portal
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── MAIN FARMER DASHBOARD ───────────── */
const FarmerDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    updateProfile,
    logout,
  } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const newOrdersCount = orders.filter(o => o.status === 'New').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':  return <Overview products={products} orders={orders} currentUser={currentUser} />;
      case 'add':       return <AddProduct onAdd={addProduct} currentUser={currentUser} />;
      case 'products':  return <MyProducts products={products} onDelete={deleteProduct} onUpdate={updateProduct} />;
      case 'orders':    return <Orders orders={orders} onUpdateStatus={updateOrderStatus} />;
      case 'demand':    return <DemandInsights />;
      case 'price':     return <PriceInsights products={products} onUpdatePrice={updateProduct} />;
      case 'earnings':  return <Earnings orders={orders} />;
      case 'logistics': return <Logistics orders={orders} />;
      case 'notifs':    return <Notifications />;
      case 'profile':   return <Profile currentUser={currentUser} onUpdateProfile={updateProfile} onLogout={handleLogout} />;
      default:          return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: 'linear-gradient(135deg,#f0fdf4 0%,#e0f2fe 100%)' }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? '250px' : '68px', background: '#0f172a', transition: 'width 0.3s', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '1rem', display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center', alignItems: 'center' }}
          title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {sidebarOpen && (
          <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid #1e293b', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>{currentUser.avatar || '🧑‍🌾'}</div>
            <div style={{ textAlign: 'center', color: 'white', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.35rem' }}>
              {currentUser.name || 'Farmer Ravi'}
            </div>
            <div style={{ textAlign: 'center', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
              {currentUser.farm || 'BeeHappy Farms'}
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: sidebarOpen ? '0.75rem 1.25rem' : '0.75rem',
                background: activeTab === item.key ? 'rgba(16,185,129,0.15)' : 'none',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === item.key ? '#10b981' : '#94a3b8',
                fontFamily: 'inherit',
                fontWeight: activeTab === item.key ? 700 : 500,
                fontSize: '0.88rem',
                textAlign: 'left',
                borderLeft: activeTab === item.key ? '3px solid #10b981' : '3px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                position: 'relative'
              }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
              {item.key === 'orders' && newOrdersCount > 0 && sidebarOpen && (
                <span style={{ marginLeft: 'auto', background: '#3b82f6', color: 'white', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.5rem' }}>
                  {newOrdersCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default FarmerDashboard;
