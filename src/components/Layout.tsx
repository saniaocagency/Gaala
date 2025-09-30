import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, Menu, X, Mail } from 'lucide-react';
import SmoothScroll from './SmoothScroll';
import OcagencyBranding from './OcagencyBranding';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#08070A] text-[#ECE8E3] font-['Inter'] antialiased">
      <SmoothScroll />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-[#08070A]/95 backdrop-blur-lg border-b border-[#ECE8E3]/10' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://i.ibb.co/LzTVQ9cj/Gallalogo.png"
              alt="Gallaa Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Gallaa
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/marketplace" 
              className={`hover:text-[#D4AF37] transition-colors duration-200 ${
                isActive('/marketplace') ? 'text-[#D4AF37]' : ''
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/credit" 
              className={`hover:text-[#D4AF37] transition-colors duration-200 ${
                isActive('/credit') ? 'text-[#D4AF37]' : ''
              }`}
            >
              Credit Solutions
            </Link>
            <Link 
              to="/pricing" 
              className={`hover:text-[#D4AF37] transition-colors duration-200 ${
                isActive('/pricing') ? 'text-[#D4AF37]' : ''
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-[#D4AF37] transition-colors duration-200 ${
                isActive('/about') ? 'text-[#D4AF37]' : ''
              }`}
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-[#ECE8E3] hover:text-[#D4AF37] transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/register" className="reward-button px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-200 transform hover:-translate-y-1">
              Get Started
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#08070A]/98 backdrop-blur-lg border-t border-[#ECE8E3]/10">
            <div className="px-6 py-4 space-y-4">
              <Link to="/marketplace" className="block py-2 hover:text-[#D4AF37] transition-colors">Marketplace</Link>
              <Link to="/credit" className="block py-2 hover:text-[#D4AF37] transition-colors">Credit Solutions</Link>
              <Link to="/pricing" className="block py-2 hover:text-[#D4AF37] transition-colors">Pricing</Link>
              <Link to="/about" className="block py-2 hover:text-[#D4AF37] transition-colors">About</Link>
              <div className="pt-4 border-t border-[#ECE8E3]/10 space-y-2">
                <Link to="/login" className="block w-full text-left py-2 hover:text-[#D4AF37] transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="reward-button block w-full px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold rounded-xl text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#ECE8E3]/5 border-t border-[#ECE8E3]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Ocagency Branding */}
          <div className="flex justify-center mb-8">
            <OcagencyBranding />
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://i.ibb.co/LzTVQ9cj/Gallalogo.png"
                  alt="Gallaa Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                  Gallaa
                </span>
              </div>
              <p className="text-[#ECE8E3]/70 mb-6 leading-relaxed">
                Gallaa B2B multivendor marketplace perfected for manufacturers, wholesalers, and retailers. 
                Revolutionizing commerce with credit-as-inventory solutions.
              </p>
              <div className="flex items-center space-x-2 text-[#ECE8E3]/70 mb-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:gallaafutures@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                  gallaafutures@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4AF37]">Platform</h4>
              <ul className="space-y-2 text-[#ECE8E3]/70">
                <li><Link to="/marketplace" className="hover:text-[#D4AF37] transition-colors">Marketplace</Link></li>
                <li><Link to="/credit" className="hover:text-[#D4AF37] transition-colors">Credit Solutions</Link></li>
                <li><Link to="/pricing" className="hover:text-[#D4AF37] transition-colors">Subscriptions</Link></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4AF37]">Quick Links</h4>
              <ul className="space-y-2 text-[#ECE8E3]/70">
                <li><Link to="/register" className="hover:text-[#D4AF37] transition-colors">Retailer Registration</Link></li>
                <li><Link to="/register" className="hover:text-[#D4AF37] transition-colors">Manufacturer Registration</Link></li>
                <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
                <li><Link to="/pricing" className="hover:text-[#D4AF37] transition-colors">Subscriptions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4AF37]">Support</h4>
              <ul className="space-y-2 text-[#ECE8E3]/70">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#ECE8E3]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#ECE8E3]/60 mb-4 md:mb-0">
              <p>© 2025 Gallaa – All Rights Reserved</p>
              <p className="text-sm mt-1">CIN: U74999DL2024PTC123456</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-[#ECE8E3]/60">
              <span>Made in India 🇮🇳</span>
              <span>•</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;