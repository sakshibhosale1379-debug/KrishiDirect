import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Truck, Leaf, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';

const ROLES = [
  { key: 'consumer', label: 'Consumer', icon: <User size={16} />, color: '#10b981' },
  { key: 'producer', label: 'Producer', icon: <Leaf size={16} />, color: '#3b82f6' },
  { key: 'logistics', label: 'Logistics', icon: <Truck size={16} />, color: '#f59e0b' },
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [role, setRole] = useState('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const activeRole = ROLES.find(r => r.key === role);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (mode === 'signup' && !form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email.';
    if (!form.password.trim()) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Persist user info so dashboards can read it
    localStorage.setItem('nexus_user', JSON.stringify({
      name: form.name,
      email: form.email,
      role,
      joined: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    }));
    // Redirect to role-specific dashboard
    if (role === 'producer') {
      navigate('/farmer-dashboard');
    } else if (role === 'consumer') {
      navigate('/consumer-dashboard');
    } else {
      navigate('/logistics');
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
    border: `1.5px solid ${hasError ? '#ef4444' : 'var(--gray-200)'}`,
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    outline: 'none',
    background: 'var(--gray-100)',
    fontFamily: 'inherit',
    color: 'var(--dark)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  const iconWrapStyle = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--gray-400)',
    display: 'flex',
    alignItems: 'center',
  };

  if (submitted) {
    return (
      <div className="container mt-8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <CheckCircle size={64} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>
            {mode === 'signup' ? 'Account Created!' : 'Welcome back!'}
          </h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
            Signed {mode === 'signup' ? 'up' : 'in'} as <strong>{form.email}</strong>
          </p>
          <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Role: <span style={{ color: activeRole.color, fontWeight: 600 }}>{activeRole.label}</span>
          </p>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '' }); }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>
            {mode === 'signup' ? 'Join NexusMarket' : 'Welcome Back'}
          </h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
            {mode === 'signup' ? 'Experience direct, transparent trade.' : 'Log in to your account.'}
          </p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--gray-100)', padding: '0.25rem', borderRadius: '0.5rem' }}>
          {ROLES.map(r => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                border: 'none',
                borderRadius: '0.35rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s',
                background: role === r.key ? 'white' : 'transparent',
                color: role === r.key ? r.color : 'var(--gray-600)',
                boxShadow: role === r.key ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} noValidate>
          {/* Name field — only for signup */}
          {mode === 'signup' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: '0.35rem' }}>
                {role === 'producer' ? 'Farm / Business Name' : 'Full Name'}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={iconWrapStyle}><User size={16} /></span>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder={role === 'producer' ? 'e.g. BeeHappy Farms' : 'e.g. Priya Sharma'}
                  style={inputStyle(!!errors.name)}
                />
              </div>
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={iconWrapStyle}><Mail size={16} /></span>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                style={inputStyle(!!errors.email)}
              />
            </div>
            {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: '0.35rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={iconWrapStyle}><Lock size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Min. 6 characters"
                style={{ ...inputStyle(!!errors.password), paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 0 }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', background: activeRole.color, boxShadow: `0 4px 14px 0 ${activeRole.color}44` }}
          >
            {mode === 'signup' ? `Sign Up as ${activeRole.label}` : 'Log In'} <ArrowRight size={18} />
          </button>
        </form>

        {/* Toggle mode */}
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--gray-600)', marginTop: '1.25rem' }}>
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <span
            onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setErrors({}); setForm({ name: '', email: '', password: '' }); }}
            style={{ color: activeRole.color, fontWeight: 600, cursor: 'pointer' }}
          >
            {mode === 'signup' ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
