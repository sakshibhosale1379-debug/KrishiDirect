import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ConsumerMarketplace from './pages/ConsumerMarketplace';
import ProducerDashboard from './pages/ProducerDashboard';
import LogisticsDashboard from './pages/LogisticsDashboard';
import AuthPage from './pages/AuthPage';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<ConsumerMarketplace />} />
          <Route path="/dashboard" element={<ProducerDashboard />} />
          <Route path="/logistics" element={<LogisticsDashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
