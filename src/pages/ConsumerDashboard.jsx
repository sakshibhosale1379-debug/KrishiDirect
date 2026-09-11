import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Package, CreditCard, Star, Bell, User, LogOut,
  Search, Menu, X, ShoppingCart, MapPin, Sparkles, CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';

const ORDER_STATUS_COLORS = {
  'New': '#3b82f6',
  'Accepted': '#10b981',
  'Processing': '#f59e0b',
  'Out for Delivery': '#8b5cf6',
  'Delivered': '#059669',
  'Cancelled': '#ef4444'
};

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy & Honey', 'Others'];

const NAV = [
  { key: 'browse',    label: 'Browse Produce',  icon: <ShoppingBag size={18}/> },
  { key: 'cart',      label: 'My Cart',         icon: <ShoppingCart size={18}/> },
  { key: 'wishlist',  label: 'Wishlist',        icon: <Heart size={18}/> },
  { key: 'orders',    label: 'My Orders',       icon: <Package size={18}/> },
  { key: 'payments',  label: 'Payments',        icon: <CreditCard size={18}/> },
  { key: 'ratings',   label: 'Ratings & Reviews',icon: <Star size={18}/> },
  { key: 'notifs',    label: 'Notifications',   icon: <Bell size={18}/> },
  { key: 'profile',   label: 'Profile',         icon: <User size={18}/> },
];

const card = { background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.4)', marginBottom: '1.5rem' };

/* ── 1. BROWSE PRODUCE ── */
const Browse = ({ products, addToCart, wishlist, toggleWishlist, currentUser, onQuickBuy }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [toastMsg, setToastMsg] = useState('');

  const filtered = products.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || (p.farmer && p.farmer.toLowerCase().includes(search.toLowerCase())) || (p.location && p.location.toLowerCase().includes(search.toLowerCase())))
  );

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 2200); };

  const handleAdd = (p, q = 1) => {
    addToCart(p, q);
    showToast(`🛒 ${p.name} (×${q}) added to cart!`);
    setSelected(null);
  };

  const handleBuyNow = (p, q = 1) => {
    addToCart(p, q);
    setSelected(null);
    onQuickBuy();
  };

  return (
    <div>
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#0f172a', color: 'white', padding: '0.85rem 1.4rem', borderRadius: '0.75rem', fontWeight: 700, zIndex: 9999, boxShadow: '0 6px 24px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="#10b981" /> {toastMsg}
        </div>
      )}

      {/* Header & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', whiteSpace: 'nowrap' }}>
          Welcome, {currentUser.name || 'Priya Sharma'}! 👋
        </h2>
        <div style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search farm fresh produce, farmers, regions..."
            style={{ width: '100%', padding: '0.7rem 0.75rem 0.7rem 2.5rem', border: '1.5px solid #e2e8f0', borderRadius: '0.75rem', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', background: 'white', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* AI Recommendations Banner */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
        <Sparkles size={28} color="#10b981" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, marginBottom: '0.2rem' }}>✨ Direct From Verified Regional Farms</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Eliminating middlemen markups — 85% of your payment goes directly to the hardworking producer.</div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{ padding: '0.5rem 1.15rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', background: cat === c ? '#10b981' : 'white', color: cat === c ? 'white' : '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}
          >
            {c === 'All' ? '🌐' : c === 'Vegetables' ? '🥦' : c === 'Fruits' ? '🍎' : c === 'Grains' ? '🌾' : c === 'Dairy & Honey' ? '🍯' : '✨'} {c}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(p => {
          const wished = wishlist.some(x => x.id === p.id);
          return (
            <div
              key={p.id}
              style={{ ...card, marginBottom: 0, padding: '1.1rem', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', display: 'flex', flexDirection: 'column' }}
              onClick={() => { setSelected(p); setQty(1); }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
            >
              {p.recommended && (
                <div style={{ position: 'absolute', top: '0.65rem', left: '0.65rem', background: '#10b981', color: 'white', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>
                  ✨ Top Harvest
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.1rem', borderRadius: '50%', padding: '0.3rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {wished ? '❤️' : '🤍'}
              </button>

              <div style={{ fontSize: '3.75rem', textAlign: 'center', padding: '1rem 0' }}>{p.image || '🌿'}</div>
              
              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '0.2rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>by {p.farmer || p.farm}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                <MapPin size={12} color="#94a3b8" />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.location}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' }}>🕒 {p.freshness || '1-3 days'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: 700 }}>★ {p.rating || 5.0}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({p.reviews || 0} reviews)</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: p.stock === 'In Stock' ? '#065f46' : '#92400e', background: p.stock === 'In Stock' ? '#d1fae5' : '#fef3c7', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>
                  {p.stock || 'In Stock'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.2rem' }}>₹{Number(p.price).toLocaleString('en-IN')}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleAdd(p, 1); }}
                  style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.82rem' }}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem 1rem', fontSize: '1.1rem' }}>
          No produce found matching "{search}". Try searching for honey, strawberry, mango, or spinach.
        </div>
      )}

      {/* Product Detail Modal */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setSelected(null)}
        >
          <div style={{ ...card, width: '100%', maxWidth: '480px', margin: 0 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '4.5rem' }}>{selected.image || '🌿'}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#64748b' }}>✕</button>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.2rem' }}>{selected.name}</h2>
            <p style={{ color: '#64748b', marginBottom: '0.75rem' }}>Grown by <strong>{selected.farmer}</strong> · {selected.location}</p>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[
                ['🕒 Freshness', selected.freshness || '1-3 days'],
                ['📦 Available', `${selected.qty} units`],
                ['⭐ Rating', `${selected.rating}/5 (${selected.reviews} reviews)`]
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', padding: '0.45rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>{k}:</span> {v}
                </div>
              ))}
            </div>

            {/* Transparent Cost Breakdown */}
            <div style={{ background: '#f0fdf4', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', border: '1px solid #bbf7d0' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '0.75rem', color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                💚 Transparent Cost Breakdown (Per Unit)
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', color: '#334155' }}>
                <span>Farmer Cut (85% Direct)</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>₹{Math.round(selected.price * 0.85).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
                <span>Logistics & Cold Storage (10%)</span>
                <span>₹{Math.round(selected.price * 0.10).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                <span>Platform & Quality Assurance (5%)</span>
                <span>₹{Math.round(selected.price * 0.05).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                <span>Total Customer Price</span>
                <span style={{ color: '#10b981' }}>₹{Number(selected.price).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Quantity:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                <span style={{ fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>
              <span style={{ fontWeight: 800, color: '#10b981', marginLeft: 'auto', fontSize: '1.2rem' }}>
                = ₹{(selected.price * qty).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => handleAdd(selected, qty)}
                style={{ flex: 1, background: '#f0fdf4', color: '#10b981', border: '2px solid #10b981', padding: '0.75rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(selected, qty)}
                style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── 2. CART & CHECKOUT ── */
const Cart = ({ cart, updateCartQty, removeFromCart, createOrder, currentUser, onViewOrders }) => {
  const subtotal = cart.reduce((s, p) => s + (p.price * p.qty), 0);
  const logisticsFee = subtotal > 500 ? 0 : 40;
  const platformFee = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + logisticsFee + platformFee;

  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address || 'Flat 402, Lotus Greens, Pune');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = createOrder({
      items: cart,
      totalPrice: grandTotal,
      buyerName: currentUser.name || 'Priya Sharma',
      buyerEmail: currentUser.email || 'consumer@krishidirect.in',
      buyerAddress: deliveryAddress,
    });
    setPlacedOrder(newOrder);
  };

  if (placedOrder) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', maxWidth: '540px', margin: '0 auto' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>✅</div>
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '0.5rem' }}>Order Confirmed!</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Your order <strong>{placedOrder.id}</strong> of <strong>₹{placedOrder.price.toLocaleString('en-IN')}</strong> has been received by the farm.
        </p>

        <div style={{ ...card, textAlign: 'left', background: '#f8fafc', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Delivery To:</span>
            <span style={{ fontWeight: 700 }}>{placedOrder.buyer}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Address:</span>
            <span style={{ fontWeight: 600, maxWidth: '280px', textAlign: 'right' }}>{placedOrder.buyerAddress}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Estimated Delivery:</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>2-3 Days (Direct Express)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => { setPlacedOrder(null); onViewOrders(); }}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.75rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
          >
            Track in My Orders →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>
        My Cart {cart.length > 0 && `(${cart.length} item${cart.length > 1 ? 's' : ''})`}
      </h2>

      {cart.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🛒</div>
          <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Your farm cart is empty</h3>
          <p style={{ color: '#64748b' }}>Browse our direct farm harvest and support local producers.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div>
            {cart.map(p => (
              <div key={p.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{p.image || '🌿'}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>by {p.farmer || p.farm} · {p.location}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginTop: '0.2rem' }}>
                    ₹{Number(p.price).toLocaleString('en-IN')} each
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => updateCartQty(p.id, p.qty - 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>{p.qty}</span>
                  <button onClick={() => updateCartQty(p.id, p.qty + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                </div>
                <span style={{ fontWeight: 800, color: '#0f172a', minWidth: '70px', textAlign: 'right' }}>
                  ₹{(p.price * p.qty).toLocaleString('en-IN')}
                </span>
                <button onClick={() => removeFromCart(p.id)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary & Checkout panel */}
          <div style={card}>
            <h3 style={{ marginBottom: '1.25rem', color: '#0f172a' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.9rem', color: '#475569' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 700 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.9rem', color: '#475569' }}>
              <span>Delivery Logistics</span>
              <span>{logisticsFee === 0 ? <strong style={{ color: '#10b981' }}>FREE (Orders &gt; ₹500)</strong> : `₹${logisticsFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#475569' }}>
              <span>Platform Fee (5%)</span>
              <span>₹{platformFee.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '0.85rem', marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a', fontSize: '1.2rem' }}>
              <span>Total</span>
              <span style={{ color: '#10b981' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Address */}
            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                rows={2}
                style={{ width: '100%', padding: '0.5rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.88rem', resize: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Payment Method */}
            <div style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Payment Mode</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.88rem', boxSizing: 'border-box' }}
              >
                <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="NetBanking">Net Banking</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: '1rem', marginTop: '1.25rem', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}
            >
              ⚡ Place Order (₹{grandTotal.toLocaleString('en-IN')})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── 3. WISHLIST ── */
const Wishlist = ({ wishlist, toggleWishlist, addToCart }) => {
  const moveToCart = (p) => {
    addToCart(p, 1);
    toggleWishlist(p);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>❤️ My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
          Your wishlist is empty. Click the heart icon on any harvest produce to save it!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {wishlist.map(p => (
            <div key={p.id} style={{ ...card, marginBottom: 0, textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{p.image || '🌿'}</div>
              <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>by {p.farmer}</p>
              <span style={{ fontWeight: 800, color: '#10b981', display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                ₹{Number(p.price).toLocaleString('en-IN')}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => moveToCart(p)} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem' }}>
                  Move to Cart
                </button>
                <button onClick={() => toggleWishlist(p)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── 4. MY ORDERS ── */
const MyOrders = ({ orders, onRateOrder, onReorder }) => {
  const stepIdx = (status) => ['New', 'Accepted', 'Processing', 'Out for Delivery', 'Delivered'].indexOf(status);

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>My Orders</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Track direct farm shipments in real-time from farm pickup to your doorstep.</p>

      {orders.map(o => {
        const currentIdx = stepIdx(o.status);
        const steps = ['Order Placed', 'Accepted by Farm', 'Packed & In Transit', 'Out for Delivery', 'Delivered'];

        return (
          <div key={o.id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontWeight: 800, color: '#0f172a' }}>{o.id} — {o.product}</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Producer: <strong>{o.farmer || o.farm}</strong> · Ordered on {o.date} · ETA: {o.eta || '2-3 Business Days'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ background: (ORDER_STATUS_COLORS[o.status] || '#94a3b8') + '22', color: ORDER_STATUS_COLORS[o.status] || '#94a3b8', padding: '0.35rem 0.85rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>
                  {o.status}
                </span>
                <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>₹{Number(o.price).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Tracking Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {steps.map((step, i) => {
                const done = i <= (currentIdx === -1 ? 0 : currentIdx);
                return (
                  <React.Fragment key={step}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '85px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: done ? '#10b981' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>
                        {done ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: done ? '#10b981' : '#94a3b8', marginTop: '0.35rem', textAlign: 'center', fontWeight: done ? 700 : 500 }}>
                        {step}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ flex: 1, height: '3px', background: i < currentIdx ? '#10b981' : '#e2e8f0', margin: '0 0.25rem', marginBottom: '1.25rem', minWidth: '35px' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {o.status === 'Delivered' && (
                <button
                  onClick={() => onRateOrder(o)}
                  style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.45rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem' }}
                >
                  ⭐ Rate Order
                </button>
              )}
              <button
                onClick={() => onReorder(o)}
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '0.45rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem' }}
              >
                🔁 Reorder Items
              </button>
            </div>
          </div>
        );
      })}

      {orders.length === 0 && (
        <div style={{ ...card, textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
          No orders yet. Place your first order directly from farmers!
        </div>
      )}
    </div>
  );
};

/* ── 5. PAYMENTS ── */
const Payments = ({ orders }) => {
  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Payment Receipts</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Full price transparency receipts with escrow settlement.</p>
      
      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Order / Payment ID', 'Produce', 'Amount (₹)', 'Date', 'Method', 'Payment Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>PAY-{o.id.replace('KD-', '')}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.9rem' }}>{o.product}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: '#10b981' }}>₹{Number(o.price).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>{o.date}</td>
                  <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>UPI / NetBanking</td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{ background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                      Paid
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

/* ── 6. RATINGS & REVIEWS ── */
const Ratings = ({ reviews, onAddReview, prefillOrder }) => {
  const [newStars, setNewStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [productName, setProductName] = useState(prefillOrder ? prefillOrder.product : 'Fresh Mahabaleshwar Strawberries');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview({
      product: productName,
      stars: newStars,
      comment: newComment.trim(),
    });
    setNewComment('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 2500);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0f172a' }}>Ratings & Reviews</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Feedback goes directly to farmers to maintain farm-quality standards.</p>

      {/* Review Submission Form */}
      <div style={{ ...card, background: 'linear-gradient(135deg,#fffbeb,#fef3c7)', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: '#92400e' }}>⭐ Leave a Review for Your Harvest Order</h3>
        {submittedToast && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.65rem 1rem', borderRadius: '0.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            ✅ Review submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '0.25rem' }}>Produce</label>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', border: '1.5px solid #fde68a', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.85rem' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <button
                type="button"
                key={s}
                onMouseEnter={() => setHoverStars(s)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setNewStars(s)}
                style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: s <= (hoverStars || newStars) ? '#f59e0b' : '#d1d5db', padding: 0 }}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={3}
            placeholder="How fresh was the produce? Describe taste, delivery, and experience..."
            style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #fde68a', borderRadius: '0.5rem', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'none', outline: 'none', background: 'white', boxSizing: 'border-box', marginBottom: '0.75rem' }}
            required
          />
          <button type="submit" style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800 }}>
            Submit Direct Review
          </button>
        </form>
      </div>

      <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Community & Customer Feedback</h3>
      {reviews.map(r => (
        <div key={r.id} style={{ ...card, display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📝</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <h4 style={{ fontWeight: 800, color: '#0f172a' }}>{r.product}</h4>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r.date}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.4rem' }}>By {r.author || 'Verified Consumer'}</p>
            <div style={{ color: '#f59e0b', marginBottom: '0.4rem', fontWeight: 700 }}>{'★'.repeat(r.stars)}{'☆'.repeat(Math.max(0, 5 - r.stars))}</div>
            <p style={{ fontSize: '0.9rem', color: '#334155' }}>{r.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── 7. NOTIFICATIONS ── */
const ConsumerNotifs = () => {
  const notifs = [
    { icon: '🛒', title: 'Farm Order Accepted', msg: 'Ravi Sharma from BeeHappy Farms accepted your Raw Organic Honey order!', time: '15 min ago', type: 'order', unread: true },
    { icon: '🚚', title: 'Out for Delivery', msg: 'SpeedShip Logistics has picked up your Mahabaleshwar Strawberries.', time: '2 hr ago', type: 'delivery', unread: true },
    { icon: '💰', title: 'Farmer Direct Discount', msg: 'Alphonso Mango price dropped by ₹50/dozen this week.', time: '4 hr ago', type: 'price', unread: true },
    { icon: '✅', title: 'Order Delivered', msg: 'KD-8490 Strawberries was delivered to your address.', time: 'Yesterday', type: 'order', unread: false },
    { icon: '❤️', title: 'Wishlist Item Harvested', msg: 'Fresh Baby Spinach is freshly harvested and back in stock!', time: '2 days ago', type: 'wish', unread: false },
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
                <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{n.title}</h4>
                {n.unread && <span style={{ background: colors[n.type], color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 800 }}>New</span>}
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

/* ── 8. PROFILE ── */
const ConsumerProfile = ({ currentUser, onUpdateProfile, onLogout, wishlistCount, ordersCount }) => {
  const [form, setForm] = useState({
    name:     currentUser.name    || '',
    email:    currentUser.email   || '',
    phone:    currentUser.phone   || '',
    address:  currentUser.address || '',
  });
  const [saved, setSaved] = useState(false);

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const save = () => {
    onUpdateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#0f172a' }}>Consumer Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left summary */}
        <div style={card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem' }}>👩</div>
            <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
              {form.name || 'Priya Sharma'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{form.email || 'consumer@krishidirect.in'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['🛒 Total Farm Orders', String(ordersCount)],
              ['❤️ Saved in Wishlist', String(wishlistCount)],
              ['📍 Delivery Address', form.address || 'Pune, Maharashtra'],
              ['📞 Mobile', form.phone || '9876543210'],
              ['📅 Member Since', currentUser.joined || 'Mar 2025'],
              ['🌱 Buyer Tier', 'Direct Farm Supporter'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{k}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right edit form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={card}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Edit Details</h3>
            {saved && (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 700, fontSize: '0.88rem' }}>
                ✅ Profile saved successfully!
              </div>
            )}
            {[
              { label: 'Full Name', field: 'name', type: 'text', placeholder: 'e.g. Priya Sharma' },
              { label: 'Email Address', field: 'email', type: 'email', placeholder: 'priya@example.com' },
              { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: 'e.g. 9876543210' },
              { label: 'Default Delivery Address', field: 'address', type: 'text', placeholder: 'e.g. Flat 402, Lotus Greens, Pune' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={handle(field)}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <button
              onClick={save}
              style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: '0.95rem', width: '100%' }}
            >
              Save Profile Changes
            </button>
          </div>

          <button
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.85rem', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem' }}
          >
            <LogOut size={18} /> Logout from Consumer Portal
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── MAIN CONSUMER DASHBOARD ── */
const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    wishlist,
    toggleWishlist,
    orders,
    createOrder,
    reviews,
    addReview,
    currentUser,
    updateProfile,
    logout,
  } = useData();

  const [activeTab, setActiveTab] = useState('browse');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rateOrderTarget, setRateOrderTarget] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleRateOrder = (order) => {
    setRateOrderTarget(order);
    setActiveTab('ratings');
  };

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        addToCart(item, item.qty || 1);
      });
    } else {
      addToCart({ id: Date.now(), name: order.product, price: order.price, farmer: order.farmer }, order.qty || 1);
    }
    setActiveTab('cart');
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
            <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>{currentUser.avatar || '👩'}</div>
            <div style={{ textAlign: 'center', color: 'white', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.35rem' }}>
              {currentUser.name || 'Priya Sharma'}
            </div>
            <div style={{ textAlign: 'center', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600 }}>
              Direct Consumer
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {NAV.map(item => (
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
              {item.key === 'cart' && cart.length > 0 && sidebarOpen && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.5rem' }}>
                  {cart.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
        {activeTab === 'browse'   && (
          <Browse
            products={products}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            currentUser={currentUser}
            onQuickBuy={() => setActiveTab('cart')}
          />
        )}
        {activeTab === 'cart'     && (
          <Cart
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            createOrder={createOrder}
            currentUser={currentUser}
            onViewOrders={() => setActiveTab('orders')}
          />
        )}
        {activeTab === 'wishlist' && (
          <Wishlist
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
          />
        )}
        {activeTab === 'orders'   && (
          <MyOrders
            orders={orders}
            onRateOrder={handleRateOrder}
            onReorder={handleReorder}
          />
        )}
        {activeTab === 'payments' && <Payments orders={orders} />}
        {activeTab === 'ratings'  && (
          <Ratings
            reviews={reviews}
            onAddReview={addReview}
            prefillOrder={rateOrderTarget}
          />
        )}
        {activeTab === 'notifs'   && <ConsumerNotifs />}
        {activeTab === 'profile'  && (
          <ConsumerProfile
            currentUser={currentUser}
            onUpdateProfile={updateProfile}
            onLogout={handleLogout}
            wishlistCount={wishlist.length}
            ordersCount={orders.length}
          />
        )}
      </main>
    </div>
  );
};

export default ConsumerDashboard;
