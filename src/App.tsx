import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Credit from './pages/Credit';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/credit" element={<Credit />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;