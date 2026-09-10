import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--gray-200)', background: 'var(--card-bg)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--dark)' }}>
          <Leaf color="var(--primary)" size={28} />
          NexusMarket
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/marketplace" className="text-gray hover:text-primary transition" style={{ fontWeight: 500 }}>Marketplace</Link>
          <Link to="/dashboard" className="text-gray hover:text-primary transition" style={{ fontWeight: 500 }}>Producer</Link>
          <Link to="/logistics" className="text-gray hover:text-primary transition" style={{ fontWeight: 500 }}>Logistics</Link>
          <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Login / Join</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
