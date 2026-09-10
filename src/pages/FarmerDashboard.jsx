import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, Package, ShoppingBag, TrendingUp, DollarSign,
  CreditCard, Truck, Bell, User, LogOut, ChevronRight, Menu, X
} from 'lucide-react';

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

const FARMER = { name: 'Ravi Sharma', farm: 'BeeHappy Farms', location: 'Nashik, Maharashtra', avatar: '🧑‍🌾', joined: 'Jan 2024' };

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Organic Honey', category: 'Dairy & Honey', qty: 50, price: 12.50, harvest: '2026-09-05', location: 'Nashik', image: '🍯', stock: 'In Stock' },
  { id: 2, name: 'Beeswax Candles', category: 'Others', qty: 30, price: 8.00, harvest: '2026-08-28', location: 'Nashik', image: '🕯️', stock: 'Low Stock' },
  { id: 3, name: 'Honeycomb Jars', category: 'Dairy & Honey', qty: 20, price: 15.00, harvest: '2026-09-01', location: 'Nashik', image: '🫙', stock: 'In Stock' },
];

const ORDERS = [
  { id: 'NX-8493', product: 'Organic Honey', qty: 3, price: 37.50, buyer: 'Priya M.', status: 'New', date: '2026-09-10' },
  { id: 'NX-8494', product: 'Beeswax Candles', qty: 5, price: 40.00, buyer: 'Ankit R.', status: 'Processing', date: '2026-09-09' },
  { id: 'NX-8495', product: 'Honeycomb Jars', qty: 2, price: 30.00, buyer: 'Sneha P.', status: 'Delivered', date: '2026-09-08' },
  { id: 'NX-8496', product: 'Organic Honey', qty: 4, price: 50.00, buyer: 'Rahul K.', status: 'Accepted', date: '2026-09-08' },
  { id: 'NX-8497', product: 'Beeswax Candles', qty: 2, price: 16.00, buyer: 'Meena T.', status: 'Cancelled', date: '2026-09-07' },
];

const TRANSACTIONS = [
  { id: 'TXN-001', product: 'Organic Honey', amount: 37.50, date: '2026-09-08', method: 'UPI', status: 'Paid' },
  { id: 'TXN-002', product: 'Honeycomb Jars', amount: 30.00, date: '2026-09-07', method: 'Card', status: 'Paid' },
  { id: 'TXN-003', product: 'Beeswax Candles', amount: 40.00, date: '2026-09-06', method: 'UPI', status: 'Pending' },
];

const DELIVERIES = [
  { id: 'DEL-101', order: 'NX-8494', product: 'Beeswax Candles', status: 'Out for Pickup', partner: 'SpeedShip', eta: '2026-09-11', steps: ['Order Placed', 'Pickup Scheduled', 'Out for Pickup', 'Delivered'] },
  { id: 'DEL-102', order: 'NX-8496', product: 'Organic Honey', status: 'Pickup Scheduled', partner: 'QuickMove', eta: '2026-09-12', steps: ['Order Placed', 'Pickup Scheduled', 'Out for Pickup', 'Delivered'] },
];

const STATUS_COLORS = {
  New: '#3b82f6', Accepted: '#10b981', Processing: '#f59e0b',
  Delivered: '#6366f1', Cancelled: '#ef4444',
};

const card = { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.4)', marginBottom: '1.5rem' };
const inputS = { width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', background: '#f8fafc', boxSizing: 'border-box' };
const labelS = { fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '0.3rem' };

/* ───────────── SECTIONS ───────────── */

const Overview = ({ products, orders }) => {
  const totalSales = TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const stats = [
    { label: 'Total Products', value: products.length, color: '#10b981', icon: '📦' },
    { label: 'Active Orders', value: activeOrders, color: '#3b82f6', icon: '📋' },
    { label: 'Total Sales', value: `₹${(totalSales * 83).toFixed(0)}`, color: '#f59e0b', icon: '💹' },
    { label: 'Earnings (Month)', value: `₹${(2450 * 83 / 100).toFixed(0)}`, color: '#6366f1', icon: '💰' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: '#0f172a' }}>
        Welcome back, {FARMER.name}! 👋
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>{FARMER.farm} · {FARMER.location}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, padding: '1.25rem', marginBottom: 0, borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={card}>
          <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Recent Orders</h3>
          {orders.slice(0, 4).map(o => (
            <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{o.product}</div>
              </div>
              <span style={{ background: STATUS_COLORS[o.status] + '22', color: STATUS_COLORS[o.status], padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{o.status}</span>
            </div>
          ))}
        </div>
        <div style={{ ...card, background: 'linear-gradient(135deg,#1e293b,#0f172a)', color: 'white' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✨ AI Demand Forecast</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>Predictions for next 7 days based on local market data.</p>
          {[{ name: 'Beeswax Candles', change: '+45%', note: 'High demand in 10km radius' }, { name: 'Honeycomb Jars', change: '+20%', note: 'Steady increase toward weekend' }].map(d => (
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

const AddProduct = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', category: 'Vegetables', qty: '', price: '', harvest: '', location: FARMER.location });
  const [success, setSuccess] = useState(false);
  const cats = ['Vegetables', 'Fruits', 'Grains', 'Dairy & Honey', 'Others'];
  const handle = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.qty || !form.price) return;
    onAdd({ ...form, id: Date.now(), image: '🌿', stock: 'In Stock' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    setForm({ name: '', category: 'Vegetables', qty: '', price: '', harvest: '', location: FARMER.location });
  };
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Add New Product</h2>
      <div style={{ ...card, maxWidth: '600px' }}>
        {success && <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 600 }}>✅ Product added successfully!</div>}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Product Name', field: 'name', type: 'text', placeholder: 'e.g. Organic Honey' },
            { label: 'Quantity (units)', field: 'qty', type: 'number', placeholder: 'e.g. 50' },
            { label: 'Price per unit (₹)', field: 'price', type: 'number', placeholder: 'e.g. 250' },
            { label: 'Harvest Date', field: 'harvest', type: 'date', placeholder: '' },
            { label: 'Farm Location', field: 'location', type: 'text', placeholder: 'e.g. Nashik, Maharashtra' },
          ].map(f => (
            <div key={f.field}>
              <label style={labelS}>{f.label}</label>
              <input type={f.type} value={form[f.field]} onChange={handle(f.field)} placeholder={f.placeholder} style={inputS} />
            </div>
          ))}
          <div>
            <label style={labelS}>Category</label>
            <select value={form.category} onChange={handle('category')} style={inputS}>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelS}>Product Image</label>
            <div style={{ border: '2px dashed #e2e8f0', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', color: '#94a3b8', cursor: 'pointer' }}>
              📷 Click to upload product image
            </div>
          </div>
          <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            + Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

const MyProducts = ({ products, onDelete }) => {
  const [editing, setEditing] = useState(null);
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>My Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ ...card, marginBottom: 0 }}>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '0.5rem' }}>{p.image}</div>
            <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>{p.category} · {p.location}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>₹{(p.price * 83).toFixed(0)}</span>
              <span style={{ fontSize: '0.8rem', background: p.stock === 'In Stock' ? '#d1fae5' : '#fef3c7', color: p.stock === 'In Stock' ? '#065f46' : '#92400e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>{p.stock}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>Qty: {p.qty} units</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setEditing(p.id)} style={{ flex: 1, padding: '0.5rem', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✏️ Edit</button>
              <button onClick={() => onDelete(p.id)} style={{ flex: 1, padding: '0.5rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <div style={{ ...card, textAlign: 'center', color: '#94a3b8' }}>No products yet. Add your first product!</div>}
    </div>
  );
};

const Orders = ({ orders }) => {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'New', 'Accepted', 'Processing', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: '#0f172a' }}>Orders</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem', background: filter === t ? '#0f172a' : '#f1f5f9', color: filter === t ? 'white' : '#64748b' }}>{t}</button>
        ))}
      </div>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Order ID', 'Product', 'Qty', 'Buyer', 'Amount', 'Date', 'Status', 'Action'].map(h => (
                <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{o.id}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.product}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.qty}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.buyer}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#10b981' }}>₹{(o.price * 83).toFixed(0)}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>{o.date}</td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <span style={{ background: STATUS_COLORS[o.status] + '22', color: STATUS_COLORS[o.status], padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{o.status}</span>
                </td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  {o.status === 'New' && <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem' }}>Accept</button>}
                  {o.status === 'Accepted' && <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem' }}>Process</button>}
                  {(o.status === 'Delivered' || o.status === 'Cancelled') && <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No {filter} orders.</div>}
      </div>
    </div>
  );
};

const DemandInsights = () => {
  const items = [
    { name: 'Beeswax Candles', demand: 85, change: '+45%', recommended: 40, reason: 'Festival season approaching. High search volume in 10km radius.' },
    { name: 'Honeycomb Jars', demand: 65, change: '+20%', recommended: 25, reason: 'Steady weekend increase. Online searches up 20% this week.' },
    { name: 'Organic Honey', demand: 70, change: '+10%', recommended: 35, reason: 'Consistent demand. Health-conscious consumer trend continues.' },
    { name: 'Royal Jelly', demand: 90, change: '+60%', recommended: 20, reason: 'New trend. Very high demand, currently undersupplied in your area.' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>AI Demand Insights</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>AI-powered demand predictions for the next 7 days based on local market, search trends, and seasonality.</p>
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
                <span>Demand Level</span><span>{item.demand}%</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${item.demand}%`, height: '100%', background: 'linear-gradient(90deg,#10b981,#3b82f6)', borderRadius: '999px', transition: 'width 0.5s' }} />
              </div>
            </div>
            <div style={{ background: '#f0fdf4', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#065f46' }}>✅ Recommended listing qty</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>{item.recommended} units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceInsights = ({ products }) => {
  const data = [
    { name: 'Organic Honey', yourPrice: 12.50, marketAvg: 10.80, suggested: 11.50, trend: 'up' },
    { name: 'Beeswax Candles', yourPrice: 8.00, marketAvg: 9.20, suggested: 8.75, trend: 'down' },
    { name: 'Honeycomb Jars', yourPrice: 15.00, marketAvg: 14.50, suggested: 14.80, trend: 'stable' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Price Insights</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Compare your prices with current market averages and get AI-suggested fair pricing.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.map(d => (
          <div key={d.name} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontWeight: 700, color: '#0f172a', minWidth: '150px' }}>{d.name}</h3>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Your Price</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>${d.yourPrice.toFixed(2)}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Market Avg</div>
                  <div style={{ fontWeight: 700, color: '#64748b', fontSize: '1.1rem' }}>${d.marketAvg.toFixed(2)}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>AI Suggested</div>
                  <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>${d.suggested.toFixed(2)}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Trend</div>
                  <div style={{ fontSize: '1.25rem' }}>{d.trend === 'up' ? '📈' : d.trend === 'down' ? '📉' : '📊'}</div>
                </div>
              </div>
              <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Apply Suggested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Earnings = () => {
  const totalEarned = TRANSACTIONS.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Earnings & Payments</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Earned', value: `$${totalEarned.toFixed(2)}`, sub: 'All time', color: '#10b981' },
          { label: 'This Month', value: '$2,450', sub: 'Sep 2026', color: '#3b82f6' },
          { label: 'Pending Payout', value: '$40.00', sub: '1 transaction', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ ...card, marginBottom: 0 }}>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{s.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color, margin: '0.25rem 0' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={card}>
        <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Transaction History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Transaction ID', 'Product', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                <th key={h} style={{ padding: '0.65rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{t.id}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{t.product}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#10b981' }}>${t.amount.toFixed(2)}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>{t.date}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>{t.method}</td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <span style={{ background: t.status === 'Paid' ? '#d1fae5' : '#fef3c7', color: t.status === 'Paid' ? '#065f46' : '#92400e', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Logistics = () => {
  const stepIdx = (del) => del.steps.indexOf(del.status);
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Delivery / Logistics</h2>
      {DELIVERIES.map(del => (
        <div key={del.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{del.id} — {del.product}</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Order {del.order} · Partner: {del.partner} · ETA: {del.eta}</p>
            </div>
            <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.3rem 0.85rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>{del.status}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {del.steps.map((step, i) => {
              const done = i <= stepIdx(del);
              return (
                <React.Fragment key={step}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? '#10b981' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: done ? '#10b981' : '#94a3b8', textAlign: 'center', fontWeight: done ? 700 : 400 }}>{step}</span>
                  </div>
                  {i < del.steps.length - 1 && (
                    <div style={{ flex: 1, height: '3px', background: i < stepIdx(del) ? '#10b981' : '#e2e8f0', margin: '0 0.25rem', marginBottom: '1.25rem' }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Notifications = () => {
  const notifs = [
    { icon: '🛒', title: 'New Order Received', msg: 'Priya M. placed an order for Organic Honey × 3', time: '5 min ago', type: 'order', unread: true },
    { icon: '💰', title: 'Price Alert', msg: 'Beeswax Candles market price increased by 12% today', time: '1 hr ago', type: 'price', unread: true },
    { icon: '📈', title: 'Demand Surge Detected', msg: 'Royal Jelly demand surged 60% in your local area', time: '3 hr ago', type: 'demand', unread: true },
    { icon: '✅', title: 'Order Delivered', msg: 'NX-8495 was successfully delivered to Sneha P.', time: 'Yesterday', type: 'order', unread: false },
    { icon: '⚠️', title: 'Low Stock Warning', msg: 'Honeycomb Jars stock is below 20 units', time: '2 days ago', type: 'stock', unread: false },
  ];
  const colors = { order: '#3b82f6', price: '#f59e0b', demand: '#10b981', stock: '#ef4444' };
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Notifications</h2>
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

const Profile = () => {
  const navigate = useNavigate();

  // Read signed-in user from localStorage
  const stored = JSON.parse(localStorage.getItem('nexus_user') || '{}');

  const [form, setForm] = useState({
    name:     stored.name     || '',
    email:    stored.email    || '',
    farm:     stored.farm     || '',
    location: stored.location || '',
    phone:    stored.phone    || '',
  });
  const [saved, setSaved] = useState(false);

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const saveProfile = () => {
    localStorage.setItem('nexus_user', JSON.stringify({ ...stored, ...form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const logout = () => {
    localStorage.removeItem('nexus_user');
    navigate('/auth');
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Left — summary card */}
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem' }}>🧑‍🌾</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
              {form.name || 'Your Name'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {form.farm || 'Your Farm Name'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['📧 Email',    form.email    || '—'],
              ['📍 Location', form.location || '—'],
              ['📞 Phone',    form.phone    || '—'],
              ['📅 Joined',   stored.joined || '—'],
              ['🌾 Role',     'Farmer / Producer'],
              ['⭐ Rating',   '4.8 / 5.0'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{k}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — edit form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={card}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Edit Profile</h3>
            {saved && (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 600, fontSize: '0.88rem' }}>
                ✅ Profile saved successfully!
              </div>
            )}
            {[
              { label: 'Full Name',    field: 'name',     type: 'text',  placeholder: 'e.g. Ravi Sharma' },
              { label: 'Farm Name',    field: 'farm',     type: 'text',  placeholder: 'e.g. BeeHappy Farms' },
              { label: 'Email Address',field: 'email',    type: 'email', placeholder: 'you@example.com' },
              { label: 'Location',     field: 'location', type: 'text',  placeholder: 'e.g. Nashik, Maharashtra' },
              { label: 'Phone Number', field: 'phone',    type: 'tel',   placeholder: 'e.g. 9876543210' },
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
              style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
            >
              Save Changes
            </button>
          </div>

          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.85rem', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── MAIN DASHBOARD ───────────── */
const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const addProduct = (p) => setProducts(prev => [...prev, p]);
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const notifCount = 3;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':  return <Overview products={products} orders={ORDERS} />;
      case 'add':       return <AddProduct onAdd={addProduct} />;
      case 'products':  return <MyProducts products={products} onDelete={deleteProduct} />;
      case 'orders':    return <Orders orders={ORDERS} />;
      case 'demand':    return <DemandInsights />;
      case 'price':     return <PriceInsights products={products} />;
      case 'earnings':  return <Earnings />;
      case 'logistics': return <Logistics />;
      case 'notifs':    return <Notifications />;
      case 'profile':   return <Profile />;
      default:          return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)', background: 'linear-gradient(135deg,#f0fdf4 0%,#e0f2fe 100%)' }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? '240px' : '64px', background: '#0f172a', transition: 'width 0.3s', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '1rem', display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center', alignItems: 'center' }}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {sidebarOpen && (
          <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid #1e293b', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>🧑‍🌾</div>
            <div style={{ textAlign: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.35rem' }}>{FARMER.name}</div>
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>{FARMER.farm}</div>
          </div>
        )}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: sidebarOpen ? '0.75rem 1rem' : '0.75rem', background: activeTab === item.key ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', cursor: 'pointer', color: activeTab === item.key ? '#10b981' : '#94a3b8', fontFamily: 'inherit', fontWeight: activeTab === item.key ? 700 : 400, fontSize: '0.88rem', textAlign: 'left', borderLeft: activeTab === item.key ? '3px solid #10b981' : '3px solid transparent', transition: 'all 0.2s', whiteSpace: 'nowrap', justifyContent: sidebarOpen ? 'flex-start' : 'center', position: 'relative' }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
              {item.key === 'notifs' && notifCount > 0 && sidebarOpen && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.45rem' }}>{notifCount}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default FarmerDashboard;
