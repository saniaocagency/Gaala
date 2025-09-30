import React, { useEffect } from 'react';
import { 
  CreditCard, 
  Store, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Star,
  Shield,
  Zap
} from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import MouseTrail from '../components/MouseTrail';
import VideoSection from '../components/VideoSection';
import FloatingCard from '../components/FloatingCard';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  useEffect(() => {
    // Always scroll to top when entering the page
    window.scrollTo(0, 0);
  }, []);

  const scrollToVideos = () => {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative text-[#ECE8E3] bg-[#08070A] overflow-x-hidden">
      <MouseTrail />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none parallax"></div>
        
        <div className="max-w-7xl mx-auto w-full">
          <FadeInUp className="text-center max-w-5xl mx-auto">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src="https://i.ibb.co/LzTVQ9cj/Gallalogo.png" 
                alt="Gallaa Logo" 
                className="h-20 w-auto floating-logo"
              />
            </div>

            {/* Trust Badge */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center space-x-2 px-6 py-3 bg-[#ECE8E3]/10 rounded-full border border-[#ECE8E3]/20 backdrop-blur-sm floating-badge">
                <Star className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                <span className="font-medium">Trusted by 500+ Premium Brands</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-black leading-tight mb-8 tracking-wide">
              <span className="block bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent glow-text">
                Wholesale.
              </span>
              <span className="block bg-gradient-to-r from-[#FFD777] to-[#D4AF37] bg-clip-text text-transparent glow-text pb-2">
                Reimagined.
              </span>
              <span className="block text-[#ECE8E3] font-extrabold">
                Credit. Confidence. Growth.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-[#ECE8E3]/80 leading-relaxed mb-12 max-w-4xl mx-auto gentle-pulse">
              India's first credit-as-inventory marketplace. Retailers get goods bundles, not cash. 
              Manufacturers get guaranteed sales. Everyone wins with real-time settlements.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/register"
                className="reward-button group px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="inline-block w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-200" />
              </Link>
              
              <button 
                className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-300 font-semibold hover:-translate-y-1 hover:scale-105 hover-glow"
                className="reward-button group px-12 py-5 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-300 font-bold text-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:-translate-y-2 hover:scale-105 hover-glow"
              >
                Watch Demo
                <ArrowRight className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 subtle-float">
              <div className="flex items-center space-x-2 floating-indicator">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 floating-indicator">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm">Real-time Settlements</span>
              </div>
              <div className="flex items-center space-x-2 floating-indicator">
                <Users className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm">₹50Cr+ Processed</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Watch Gallaa in Action
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto mb-8">
              See how we're transforming B2B commerce across India with our revolutionary credit-as-inventory model.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={100}>
            <VideoSection />
          </FadeInUp>
        </div>
      </section>

      {/* Preview Cards Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              Discover our comprehensive suite of tools designed to revolutionize your B2B operations.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInUp delay={100}>
              <FloatingCard
                title="Smart Pricing"
                description="Transparent, competitive pricing with no hidden fees. Choose the plan that scales with your business."
                icon={TrendingUp}
                link="/pricing"
                features={[
                  "Flexible subscription tiers",
                  "No setup fees",
                  "Cancel anytime",
                  "Volume discounts"
                ]}
                delay={0}
              />
            </FadeInUp>

            <FadeInUp delay={200}>
              <FloatingCard
                title="Premium Marketplace"
                description="Access India's largest network of verified luxury manufacturers and premium retailers."
                icon={Store}
                link="/marketplace"
                features={[
                  "500+ verified manufacturers",
                  "2000+ active retailers",
                  "Quality assurance",
                  "Real-time inventory"
                ]}
                delay={200}
              />
            </FadeInUp>

            <FadeInUp delay={300}>
              <FloatingCard
                title="Credit Solutions"
                description="Revolutionary credit-as-inventory model. Get goods bundles instead of cash loans."
                icon={CreditCard}
                link="/credit"
                features={[
                  "Instant credit approval",
                  "Goods-based credit",
                  "Flexible repayment",
                  "Build credit score"
                ]}
                delay={400}
              />
            </FadeInUp>

            <FadeInUp delay={400}>
              <FloatingCard
                title="Our Story"
                description="Learn how we're solving the biggest challenges in B2B commerce with innovative technology."
                icon={Users}
                link="/about"
                features={[
                  "Founded by industry experts",
                  "Backed by leading VCs",
                  "ISO certified platform",
                  "Trusted by thousands"
                ]}
                delay={600}
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-[#ECE8E3]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of manufacturers and retailers who are already growing with Gallaa's revolutionary platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  to="/register"
                  className="reward-button group px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-200 transform hover:-translate-y-1"
                >
                  Start Your Journey
                  <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button 
                  onClick={scrollToVideos}
                  className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-200 font-semibold"
                >
                  Watch Demo
                </button>
              </div>

              <p className="text-[#ECE8E3]/60 mt-8 text-sm">
                No credit card required • Free 14-day trial • Setup in minutes
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
};

export default Home;