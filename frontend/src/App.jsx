import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Analyse from './pages/Analyse';
import Apropos from './pages/Apropos';
import AnalysisDetail from './pages/AnalysisDetail';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Global animated background */}
        <div className="blob-canvas">
          <div className="blob bg-brand-200 w-96 h-96 top-0 left-0 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="blob bg-purple-200 w-96 h-96 top-0 right-0 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-2000"></div>
          <div className="blob bg-pink-200 w-96 h-96 -bottom-32 left-20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-4000"></div>
        </div>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
