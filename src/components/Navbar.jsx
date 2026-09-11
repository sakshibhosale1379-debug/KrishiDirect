import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, LogOut, User } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar = () => {
  const { currentUser, logout, cart } = useData();
  const navigate = useNavigate();
  const isLoggedIn = currentUser && currentUser.role && currentUser.role !== 'guest' && currentUser.email;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: 600,
    fontSize: '0.95rem',
    color: isActive ? 'var(--primary)' : 'var(--gray-600)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem'
  });

  return (
    <nav style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-200)', background: 'var(--card-bg)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf color="white" size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.1 }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Direct</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--gray-600)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Farm-to-Fork Marketplace
            </div>
          </div>
        </Link>

        <div className="flex gap-6 items-center">
          <NavLink to="/marketplace" style={navLinkStyle}>
            Marketplace
          </NavLink>
          <NavLink to="/farmer-dashboard" style={navLinkStyle}>
            Farmer Portal
          </NavLink>
          <NavLink to="/logistics" style={navLinkStyle}>
            Logistics
          </NavLink>
        </div>

        <div className="flex gap-3 items-center">
          {/* Cart Icon for Consumers */}
          <Link
            to="/consumer-dashboard"
            style={{ position: 'relative', background: 'var(--gray-100)', padding: '0.5rem', borderRadius: '50%', color: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
            title="Go to Cart / Consumer Portal"
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 700, borderRadius: '999px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                {cart.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                to={currentUser.role === 'producer' ? '/farmer-dashboard' : currentUser.role === 'logistics' ? '/logistics' : '/consumer-dashboard'}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--gray-200)', padding: '0.35rem 0.85rem', borderRadius: '999px', textDecoration: 'none', color: 'var(--dark)' }}
              >
                <span style={{ fontSize: '1.2rem' }}>{currentUser.avatar || '👤'}</span>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.7rem', color: currentUser.role === 'producer' ? '#10b981' : currentUser.role === 'logistics' ? '#f59e0b' : '#3b82f6', fontWeight: 600, textTransform: 'capitalize' }}>
                    {currentUser.role === 'producer' ? 'Farmer' : currentUser.role}
                  </div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)', padding: '0.4rem', borderRadius: '0.4rem', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}>
              <User size={16} /> Login / Join
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
