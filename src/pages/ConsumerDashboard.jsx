import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Package, CreditCard, Star, Bell, User, LogOut,
  Search, Menu, X, ShoppingCart, MapPin, Filter, Sparkles
} from 'lucide-react';

const CONSUMER = { name: 'Priya Sharma', email: 'priya@example.com', avatar: '👩', joined: 'Mar 2025' };

const ALL_PRODUCTS = [
  { id: 1, name: 'Organic Honey', farmer: 'BeeHappy Farms', location: 'Nashik', qty: 50, price: 12.50, freshness: '5 days', category: 'Dairy', rating: 4.8, reviews: 124, image: '🍯', recommended: true },
  { id: 2, name: 'Fresh Strawberries', farmer: 'Valley Berries', location: 'Mahabaleshwar', qty: 30, price: 6.00, freshness: '2 days', category: 'Fruits', rating: 4.9, reviews: 87, image: '🍓', recommended: true },
  { id: 3, name: 'Artisan Sourdough', farmer: 'Crust Bakery', location: 'Pune', qty: 15, price: 8.50, freshness: '1 day', category: 'Grains', rating: 4.7, reviews: 56, image: '🍞', recommended: false },
  { id: 4, name: 'Roasted Coffee Beans', farmer: 'Morning Brew', location: 'Coorg', qty: 40, price: 15.00, freshness: '30 days', category: 'Others', rating: 4.6, reviews: 210, image: '☕', recommended: false },
  { id: 5, name: 'Baby Spinach', farmer: 'GreenLeaf Farm', location: 'Kolhapur', qty: 60, price: 3.50, freshness: '3 days', category: 'Vegetables', rating: 4.5, reviews: 43, image: '🥬', recommended: true },
  { id: 6, name: 'Farm Fresh Milk', farmer: 'Gopal Dairy', location: 'Amul, Anand', qty: 100, price: 1.80, freshness: '2 days', category: 'Dairy', rating: 4.9, reviews: 302, image: '🥛', recommended: false },
  { id: 7, name: 'Alphonso Mangoes', farmer: 'Konkan Harvest', location: 'Ratnagiri', qty: 25, price: 18.00, freshness: '4 days', category: 'Fruits', rating: 5.0, reviews: 189, image: '🥭', recommended: true },
  { id: 8, name: 'Brown Rice (5kg)', farmer: 'Paddy Fields Co.', location: 'Bhandara', qty: 80, price: 9.00, freshness: '180 days', category: 'Grains', rating: 4.4, reviews: 67, image: '🌾', recommended: false },
];

const MY_ORDERS = [
  { id: 'NX-8493', product: 'Organic Honey', qty: 3, price: 37.50, date: '2026-09-10', status: 'Out for Delivery', farmer: 'BeeHappy Farms', eta: '2026-09-11' },
  { id: 'NX-8490', product: 'Fresh Strawberries', qty: 2, price: 12.00, date: '2026-09-06', status: 'Delivered', farmer: 'Valley Berries', eta: '2026-09-07' },
  { id: 'NX-8481', product: 'Baby Spinach', qty: 5, price: 17.50, date: '2026-09-01', status: 'Delivered', farmer: 'GreenLeaf Farm', eta: '2026-09-03' },
];

const ORDER_STATUS_COLORS = { 'Out for Delivery': '#3b82f6', 'Delivered': '#10b981', 'Processing': '#f59e0b', 'Cancelled': '#ef4444' };
const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Others'];

const NAV = [
  { key: 'browse',    label: 'Browse Products', icon: <ShoppingBag size={18}/> },
  { key: 'cart',      label: 'My Cart',          icon: <ShoppingCart size={18}/> },
  { key: 'wishlist',  label: 'Wishlist',         icon: <Heart size={18}/> },
  { key: 'orders',    label: 'My Orders',        icon: <Package size={18}/> },
  { key: 'payments',  label: 'Payments',         icon: <CreditCard size={18}/> },
  { key: 'ratings',   label: 'Ratings & Reviews',icon: <Star size={18}/> },
  { key: 'notifs',    label: 'Notifications',    icon: <Bell size={18}/> },
  { key: 'profile',   label: 'Profile',          icon: <User size={18}/> },
];

const card = { background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.4)', marginBottom: '1.5rem' };

/* ── BROWSE ── */
const Browse = ({ cart, setCart, wishlist, setWishlist }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [toastMsg, setToastMsg] = useState('');

  const filtered = ALL_PRODUCTS.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase()))
  );

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 2000); };

  const addToCart = (p, q = 1) => {
    setCart(prev => {
      const exists = prev.find(x => x.id === p.id);
      if (exists) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + q } : x);
      return [...prev, { ...p, qty: q }];
    });
    showToast(`🛒 ${p.name} added to cart!`);
    setSelected(null);
  };

  const toggleWish = (p) => {
    setWishlist(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  return (
    <div>
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#0f172a', color: 'white', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>{toastMsg}</div>
      )}

      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', whiteSpace: 'nowrap' }}>Welcome, {CONSUMER.name}! 👋</h2>
        <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products, farmers..."
            style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.5rem', border: '1.5px solid #e2e8f0', borderRadius: '0.75rem', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', background: 'white', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* AI Recommendations banner */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
        <Sparkles size={28} color="#10b981" />
        <div>
          <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>✨ Smart Recommendations Active</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Showing personalized picks based on your taste and purchase history</div>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: '0.45rem 1.1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', background: cat === c ? '#10b981' : 'white', color: cat === c ? 'white' : '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
            {c === 'All' ? '🌐' : c === 'Vegetables' ? '🥦' : c === 'Fruits' ? '🍎' : c === 'Grains' ? '🌾' : c === 'Dairy' ? '🥛' : '✨'} {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.1rem' }}>
        {filtered.map(p => {
          const wished = wishlist.find(x => x.id === p.id);
          return (
            <div key={p.id} style={{ ...card, marginBottom: 0, padding: '1rem', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}>
              {p.recommended && (
                <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }}>✨ Top Pick</div>
              )}
              <button onClick={(e) => { e.stopPropagation(); toggleWish(p); }} style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.1rem', borderRadius: '50%', padding: '0.25rem' }}>
                {wished ? '❤️' : '🤍'}
              </button>
              <div onClick={() => { setSelected(p); setQty(1); }} style={{ fontSize: '3.5rem', textAlign: 'center', padding: '1.25rem 0' }}>{p.image}</div>
              <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.35rem' }}>by {p.farmer}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                <MapPin size={11} color="#94a3b8" />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.location}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' }}>🕒 {p.freshness}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>★ {p.rating}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({p.reviews})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>${p.price.toFixed(2)}</span>
                <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem' }}>+ Cart</button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem', fontSize: '1.1rem' }}>No products found for "{search}"</div>
      )}

      {/* Product Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelected(null)}>
          <div style={{ ...card, width: '100%', maxWidth: '480px', margin: 0 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
            <div style={{ fontSize: '5rem', textAlign: 'center', marginBottom: '0.75rem' }}>{selected.image}</div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.25rem' }}>{selected.name}</h2>
            <p style={{ color: '#64748b', marginBottom: '0.75rem' }}>by {selected.farmer} · {selected.location}</p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[['🕒 Freshness', selected.freshness], ['📦 Available', `${selected.qty} units`], ['⭐ Rating', `${selected.rating}/5 (${selected.reviews} reviews)`]].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', padding: '0.5rem 0.85rem', borderRadius: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>{k}:</span> {v}
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div style={{ background: '#f0fdf4', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#065f46' }}>💚 Transparent Price Breakdown</h4>
              {[['Farmer Earnings (85%)', selected.price * 0.85], ['Logistics (10%)', selected.price * 0.10], ['Platform Fee (5%)', selected.price * 0.05]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', color: '#475569' }}>
                  <span>{k}</span><span style={{ fontWeight: 600 }}>${v.toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                <span>Total</span><span style={{ color: '#10b981', fontSize: '1.1rem' }}>${selected.price.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Qty:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>-</button>
                <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>+</button>
              </div>
              <span style={{ fontWeight: 700, color: '#10b981', marginLeft: 'auto', fontSize: '1.1rem' }}>= ${(selected.price * qty).toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => addToCart(selected, qty)} style={{ flex: 1, background: '#f0fdf4', color: '#10b981', border: '2px solid #10b981', padding: '0.75rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>🛒 Add to Cart</button>
              <button onClick={() => addToCart(selected, qty)} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>⚡ Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── CART ── */
const Cart = ({ cart, setCart }) => {
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const [ordered, setOrdered] = useState(false);
  const update = (id, qty) => setCart(prev => qty < 1 ? prev.filter(x => x.id !== id) : prev.map(x => x.id === id ? { ...x, qty } : x));

  if (ordered) return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '5rem' }}>✅</div>
      <h2 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '1rem 0 0.5rem' }}>Order Placed!</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Your order has been placed. You will receive updates soon.</p>
      <button onClick={() => { setOrdered(false); setCart([]); }} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Continue Shopping</button>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>My Cart {cart.length > 0 && `(${cart.length} items)`}</h2>
      {cart.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>🛒 Your cart is empty. Start browsing!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div>
            {cart.map(p => (
              <div key={p.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ fontSize: '3rem' }}>{p.image}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>by {p.farmer} · {p.location}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => update(p.id, p.qty - 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                  <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{p.qty}</span>
                  <button onClick={() => update(p.id, p.qty + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                </div>
                <span style={{ fontWeight: 700, color: '#10b981', minWidth: '60px', textAlign: 'right' }}>${(p.price * p.qty).toFixed(2)}</span>
                <button onClick={() => update(p.id, 0)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={card}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Order Summary</h3>
            {[['Subtotal', `$${total.toFixed(2)}`], ['Logistics', '$2.50'], ['Platform Fee', `$${(total * 0.05).toFixed(2)}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.9rem', color: '#475569' }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>
              <span>Total</span><span style={{ color: '#10b981' }}>${(total + 2.50 + total * 0.05).toFixed(2)}</span>
            </div>
            <button onClick={() => setOrdered(true)} style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '1rem', marginTop: '1rem' }}>
              ⚡ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── WISHLIST ── */
const Wishlist = ({ wishlist, setWishlist, setCart }) => {
  const move = (p) => {
    setCart(prev => prev.find(x => x.id === p.id) ? prev : [...prev, { ...p, qty: 1 }]);
    setWishlist(prev => prev.filter(x => x.id !== p.id));
  };
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>❤️ Wishlist</h2>
      {wishlist.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Your wishlist is empty. Add products you love!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.1rem' }}>
          {wishlist.map(p => (
            <div key={p.id} style={{ ...card, marginBottom: 0, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{p.image}</div>
              <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>by {p.farmer}</p>
              <span style={{ fontWeight: 700, color: '#10b981', display: 'block', marginBottom: '0.75rem' }}>${p.price.toFixed(2)}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => move(p)} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem' }}>Add to Cart</button>
                <button onClick={() => setWishlist(prev => prev.filter(x => x.id !== p.id))} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.5rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── MY ORDERS ── */
const MyOrders = () => {
  const stepIdx = (status) => ['Placed', 'Processing', 'Out for Delivery', 'Delivered'].indexOf(status);
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>My Orders</h2>
      {MY_ORDERS.map(o => (
        <div key={o.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{o.id} — {o.product}</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>from {o.farmer} · Ordered {o.date} · ETA: {o.eta}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: (ORDER_STATUS_COLORS[o.status] || '#94a3b8') + '22', color: ORDER_STATUS_COLORS[o.status] || '#94a3b8', padding: '0.3rem 0.85rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>{o.status}</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>${o.price.toFixed(2)}</span>
            </div>
          </div>
          {/* Tracking steps */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {['Placed', 'Processing', 'Out for Delivery', 'Delivered'].map((step, i) => {
              const done = i <= (stepIdx(o.status) === -1 ? 3 : stepIdx(o.status));
              return (
                <React.Fragment key={step}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: done ? '#10b981' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>{done ? '✓' : i + 1}</div>
                    <span style={{ fontSize: '0.68rem', color: done ? '#10b981' : '#94a3b8', marginTop: '0.3rem', textAlign: 'center', maxWidth: '70px', fontWeight: done ? 700 : 400 }}>{step}</span>
                  </div>
                  {i < 3 && <div style={{ flex: 1, height: '2px', background: i < stepIdx(o.status) ? '#10b981' : '#e2e8f0', margin: '0 0.2rem', marginBottom: '1.2rem' }} />}
                </React.Fragment>
              );
            })}
          </div>
          {o.status === 'Delivered' && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '0.4rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem' }}>⭐ Rate Order</button>
              <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '0.4rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem' }}>🔁 Reorder</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── PAYMENTS ── */
const Payments = () => {
  const txns = [
    { id: 'PAY-201', product: 'Organic Honey × 3', amount: 37.50, date: '2026-09-10', method: 'UPI', status: 'Success' },
    { id: 'PAY-198', product: 'Baby Spinach × 5', amount: 17.50, date: '2026-09-01', method: 'Card', status: 'Success' },
    { id: 'PAY-190', product: 'Fresh Strawberries × 2', amount: 12.00, date: '2026-08-25', method: 'UPI', status: 'Refunded' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Payment History</h2>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Payment ID', 'Product', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {txns.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{t.id}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{t.product}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#10b981' }}>${t.amount.toFixed(2)}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>{t.date}</td>
                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>{t.method}</td>
                <td style={{ padding: '0.85rem 0.5rem' }}>
                  <span style={{ background: t.status === 'Success' ? '#d1fae5' : '#fef3c7', color: t.status === 'Success' ? '#065f46' : '#92400e', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ── RATINGS ── */
const Ratings = () => {
  const [ratings, setRatings] = useState([
    { id: 1, product: 'Fresh Strawberries', farmer: 'Valley Berries', date: '2026-08-26', stars: 5, comment: 'Absolutely fresh! Perfect sweetness. Will order again.' },
    { id: 2, product: 'Baby Spinach', farmer: 'GreenLeaf Farm', date: '2026-09-02', stars: 4, comment: 'Very fresh and clean. Good quantity for the price.' },
  ]);
  const [hover, setHover] = useState({});
  const pendingReview = { id: 'NX-8493', product: 'Organic Honey', farmer: 'BeeHappy Farms' };
  const [newStars, setNewStars] = useState(0);
  const [newComment, setNewComment] = useState('');
  const submit = () => {
    if (!newStars || !newComment) return;
    setRatings(prev => [...prev, { id: Date.now(), product: pendingReview.product, farmer: pendingReview.farmer, date: new Date().toISOString().split('T')[0], stars: newStars, comment: newComment }]);
    setNewStars(0); setNewComment('');
  };
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Ratings & Reviews</h2>
      <div style={{ ...card, background: 'linear-gradient(135deg,#fffbeb,#fef3c7)', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: '#92400e' }}>⭐ Rate your recent order</h3>
        <p style={{ color: '#92400e', fontSize: '0.85rem', marginBottom: '1rem' }}>{pendingReview.product} from {pendingReview.farmer}</p>
        <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onMouseEnter={() => setHover({ s })} onMouseLeave={() => setHover({})} onClick={() => setNewStars(s)}
              style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: s <= (hover.s || newStars) ? '#f59e0b' : '#d1d5db' }}>★</button>
          ))}
        </div>
        <textarea value={newComment} onChange={e => setNewComment(e.target.value)} rows={3} placeholder="Share your experience..." style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #fde68a', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'none', outline: 'none', background: 'white', boxSizing: 'border-box', marginBottom: '0.75rem' }} />
        <button onClick={submit} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Submit Review</button>
      </div>
      <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Your Reviews</h3>
      {ratings.map(r => (
        <div key={r.id} style={{ ...card, display: 'flex', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📝</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <h4 style={{ fontWeight: 700, color: '#0f172a' }}>{r.product}</h4>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r.date}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>by {r.farmer}</p>
            <div style={{ color: '#f59e0b', marginBottom: '0.35rem' }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>{r.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── NOTIFICATIONS ── */
const ConsumerNotifs = () => {
  const notifs = [
    { icon: '🛒', title: 'Order Placed', msg: 'Your order NX-8493 for Organic Honey has been placed successfully!', time: '10 min ago', type: 'order', unread: true },
    { icon: '🚚', title: 'Out for Delivery', msg: 'Your Organic Honey is out for delivery. Expected by tomorrow!', time: '2 hr ago', type: 'delivery', unread: true },
    { icon: '💰', title: 'Price Drop Alert', msg: 'Fresh Strawberries price dropped by 10%. Order now!', time: '5 hr ago', type: 'price', unread: true },
    { icon: '✅', title: 'Order Delivered', msg: 'NX-8490 Baby Spinach was delivered successfully.', time: 'Yesterday', type: 'order', unread: false },
    { icon: '❤️', title: 'Wishlist Item Available', msg: 'Alphonso Mangoes from your wishlist is now in stock!', time: '2 days ago', type: 'wish', unread: false },
  ];
  const colors = { order: '#10b981', delivery: '#3b82f6', price: '#f59e0b', wish: '#ec4899' };
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Notifications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ ...card, marginBottom: 0, display: 'flex', gap: '1rem', alignItems: 'flex-start', borderLeft: n.unread ? `4px solid ${colors[n.type]}` : '4px solid transparent' }}>
            <div style={{ fontSize: '1.75rem' }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

/* ── PROFILE ── */
const ConsumerProfile = ({ wishlist }) => {
  const navigate = useNavigate();

  const stored = JSON.parse(localStorage.getItem('nexus_user') || '{}');

  const [form, setForm] = useState({
    name:     stored.name     || '',
    email:    stored.email    || '',
    phone:    stored.phone    || '',
    address:  stored.address  || '',
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

        {/* Left — summary */}
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem' }}>👩</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
              {form.name || 'Your Name'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{form.email || 'your@email.com'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['🛒 Total Orders',    '3'],
              ['❤️ Wishlist Items',  String(wishlist.length)],
              ['⭐ Reviews Given',   '2'],
              ['📞 Phone',           form.phone   || '—'],
              ['📍 Address',         form.address || '—'],
              ['📅 Member Since',    stored.joined || '—'],
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
              { label: 'Full Name',        field: 'name',    type: 'text',  placeholder: 'e.g. Priya Sharma' },
              { label: 'Email Address',    field: 'email',   type: 'email', placeholder: 'you@example.com' },
              { label: 'Phone Number',     field: 'phone',   type: 'tel',   placeholder: 'e.g. 9876543210' },
              { label: 'Delivery Address', field: 'address', type: 'text',  placeholder: 'e.g. 12 MG Road, Pune' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={handle(field)}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', background: '#f8fafc', boxSizing: 'border-box' }}
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

/* ── MAIN ── */
const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)', background: 'linear-gradient(135deg,#f0fdf4 0%,#e0f2fe 100%)' }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? '240px' : '64px', background: '#0f172a', transition: 'width 0.3s', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '1rem', display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center', alignItems: 'center' }}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {sidebarOpen && (
          <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid #1e293b', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>{CONSUMER.avatar}</div>
            <div style={{ textAlign: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.35rem' }}>{CONSUMER.name}</div>
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>Consumer</div>
          </div>
        )}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {NAV.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: sidebarOpen ? '0.75rem 1rem' : '0.75rem', background: activeTab === item.key ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', cursor: 'pointer', color: activeTab === item.key ? '#10b981' : '#94a3b8', fontFamily: 'inherit', fontWeight: activeTab === item.key ? 700 : 400, fontSize: '0.88rem', textAlign: 'left', borderLeft: activeTab === item.key ? '3px solid #10b981' : '3px solid transparent', transition: 'all 0.2s', whiteSpace: 'nowrap', justifyContent: sidebarOpen ? 'flex-start' : 'center', position: 'relative' }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
              {item.key === 'cart' && cart.length > 0 && sidebarOpen && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.45rem' }}>{cart.length}</span>
              )}
              {item.key === 'notifs' && sidebarOpen && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.45rem' }}>3</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
        {activeTab === 'browse'   && <Browse cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />}
        {activeTab === 'cart'     && <Cart cart={cart} setCart={setCart} />}
        {activeTab === 'wishlist' && <Wishlist wishlist={wishlist} setWishlist={setWishlist} setCart={setCart} />}
        {activeTab === 'orders'   && <MyOrders />}
        {activeTab === 'payments' && <Payments />}
        {activeTab === 'ratings'  && <Ratings />}
        {activeTab === 'notifs'   && <ConsumerNotifs />}
        {activeTab === 'profile'  && <ConsumerProfile wishlist={wishlist} />}
      </main>
    </div>
  );
};

export default ConsumerDashboard;
