import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LogisticsDashboard from './pages/LogisticsDashboard';
import AuthPage from './pages/AuthPage';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Primary & alias routes */}
            <Route path="/marketplace" element={<ConsumerDashboard />} />
            <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
            <Route path="/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/logistics" element={<LogisticsDashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
