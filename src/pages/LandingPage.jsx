import React from 'react';
import { ArrowRight, BarChart3, TrendingUp, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container mt-8 animate-fade-up">
      <section className="text-center" style={{ padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
          Bridging the Gap: <br/> <span className="text-primary">Smart, Direct, Transparent.</span>
        </h1>
        <p className="text-gray" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          Eliminating unnecessary middlemen to maximize producer earnings and provide consumers with fresh products at lower prices.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/marketplace" className="btn btn-primary">
            Explore Marketplace <ArrowRight size={20} />
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            Producer Portal
          </Link>
        </div>
      </section>

      <section className="mt-8 mb-8" style={{ padding: '4rem 0' }}>
        <h2 className="text-center text-dark" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Why NexusMarket?</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="glass-card flex flex-col items-center text-center">
            <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <BarChart3 size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Transparent Pricing</h3>
            <p className="text-gray">Consumers see the exact split of their payment. No hidden fees, complete traceability.</p>
          </div>
          
          <div className="glass-card flex flex-col items-center text-center">
            <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <TrendingUp size={32} color="var(--secondary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI Demand Matching</h3>
            <p className="text-gray">Predicts local consumer demand to advise producers on supply, minimizing wastage.</p>
          </div>

          <div className="glass-card flex flex-col items-center text-center">
            <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Truck size={32} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Smart Route Optimization</h3>
            <p className="text-gray">Dynamically groups orders geographically to reduce logistics overhead and carbon footprint.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
