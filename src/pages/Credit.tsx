import React, { useState, useEffect } from 'react';
import { 
  Package, 
  TrendingUp, 
  Shield, 
  Users,
  CheckCircle, 
  Calculator,
  ArrowRight,
  Lightbulb,
  Target
} from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import AnimatedInfographic from '../components/AnimatedInfographic';
import OcagencyBranding from '../components/OcagencyBranding';

const Credit: React.FC = () => {
  useEffect(() => {
    // always start at top
    window.scrollTo(0, 0);

    // --- Mouse trail (subtle gold glow) ---
    const dot = document.createElement('div');
    const tail = document.createElement('div');

    // base styles for dot + tail (inline to avoid needing css files)
    Object.assign(dot.style, {
      position: 'fixed',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,215,119,0.95) 0%, rgba(255,215,119,0.45) 40%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-9999px, -9999px)',
      transition: 'transform 0.06s linear',
    });
    Object.assign(tail.style, {
      position: 'fixed',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: '9998',
      transform: 'translate(-9999px, -9999px)',
      transition: 'transform 0.12s linear',
    });

    document.body.appendChild(tail);
    document.body.appendChild(dot);

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // immediate dot, slight lag tail
      dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      // tail lags a bit using last positions
      tail.style.transform = `translate(${(lastX + x) / 2 - 14}px, ${(lastY + y) / 2 - 14}px)`;

      lastX = x;
      lastY = y;
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      dot.remove();
      tail.remove();
    };
  }, []);

  const [stockQuantity, setStockQuantity] = useState(10000);
  const [stockValuePerItem, setStockValuePerItem] = useState(500);
  const [businessType, setBusinessType] = useState('retailer');

  const calculateStockWorth = () => {
    return stockQuantity * stockValuePerItem;
  };

  const calculateRepayment = () => {
    const assumedSellRate = 0.7; // 70% sell-through
    return Math.round(stockQuantity * stockValuePerItem * assumedSellRate);
  };

  const creditFeatures = [
    {
      icon: Package,
      title: "Goods-Based Credit",
      description: "Receive actual products as credit instead of cash. T-shirts, jeans, electronics - real inventory you can sell immediately.",
      benefit: "Zero cash risk, immediate inventory"
    },
    {
      icon: TrendingUp,
      title: "Build Credit Score",
      description: "Every successful sale and timely payment builds your Gallaa credit score, unlocking higher credit limits and better terms.",
      benefit: "Grow your business capacity over time"
    },
    {
      icon: Shield,
      title: "Risk-Free Returns",
      description: "Unsold items can be returned to manufacturers through our platform. You only pay for what you actually sell.",
      benefit: "No inventory risk or dead stock"
    },
    {
      icon: Users,
      title: "Manufacturer Network",
      description: "Access products from multiple verified manufacturers simultaneously. Diversify your inventory without multiple credit applications.",
      benefit: "One platform, endless possibilities"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Apply for Credit",
      description: "Submit your business documents and get instant credit approval based on our AI assessment."
    },
    {
      step: "2", 
      title: "Choose Products",
      description: "Browse our marketplace and select product bundles that match your customer demand."
    },
    {
      step: "3",
      title: "Receive Inventory",
      description: "Get physical products delivered to your store - no cash changes hands initially."
    },
    {
      step: "4",
      title: "Sell & Profit",
      description: "Sell the products to your customers and keep the profit margins."
    },
    {
      step: "5",
      title: "Pay & Return",
      description: "Pay for sold items, return unsold ones. Build credit score for future transactions."
    }
  ];

  return (
    <div className="px-6 py-8 relative overflow-hidden">
      {/* Background Glow (non-invasive) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FFD777]/5 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Header */}
        <FadeInUp className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.18)]">
            Credit Solutions Reimagined
          </h1>
          <p className="text-xl text-[#ECE8E3]/80 max-w-4xl mx-auto leading-relaxed">
            Revolutionary credit-as-inventory model. Retailers receive goods bundles (t-shirts, jeans, electronics) 
            as credit instead of cash. Sell first, pay later, return unsold items.
          </p>
        </FadeInUp>

        {/* Key Concept Highlight */}
        <FadeInUp delay={100} className="mb-20">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 text-center backdrop-blur-sm hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-400">
            <Lightbulb className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              The Game Changer: Real-Time Payment Solution
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto leading-relaxed">
              Unlike traditional loans, our credit system gives you actual products to sell. 
              This restores cash flow immediately and eliminates the burden of loan repayments without sales.
            </p>
          </div>
        </FadeInUp>

        {/* Animated Infographic */}
        <FadeInUp delay={200} className="mb-20">
          <AnimatedInfographic />
        </FadeInUp>

        {/* Credit Calculator (UNCHANGED, reinserted) */}
        <FadeInUp delay={300} className="mb-20">
          <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                Credit Calculator
              </h2>
              <p className="text-[#ECE8E3]/80">
                Estimate your potential inventory credit and repayment structure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] transition-all duration-200"
                  >
                    <option value="retailer" className="bg-[#08070A] text-[#ECE8E3]">Retailer</option>
                    <option value="manufacturer" className="bg-[#08070A] text-[#ECE8E3]">Manufacturer</option>
                    <option value="distributor" className="bg-[#08070A] text-[#ECE8E3]">Distributor</option>
                  </select>
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Inventory Quantity: {stockQuantity.toLocaleString()} items
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full h-3 bg-[#ECE8E3]/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-[#ECE8E3]/60 mt-2">
                    <span>1k items</span>
                    <span>50k items</span>
                  </div>
                </div>

                {/* Value Per Item */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Average Value Per Item: ₹{stockValuePerItem}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={stockValuePerItem}
                    onChange={(e) => setStockValuePerItem(Number(e.target.value))}
                    className="w-full h-3 bg-[#ECE8E3]/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-[#ECE8E3]/60 mt-2">
                    <span>₹100</span>
                    <span>₹5000</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 rounded-2xl p-8 border border-[#D4AF37]/20">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-3 text-[#D4AF37]" />
                  Your Credit Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#ECE8E3]/70">Total Inventory Value</span>
                    <span className="font-bold text-xl text-[#D4AF37]">₹{calculateStockWorth().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#ECE8E3]/70">Expected Sales (70%)</span>
                    <span className="font-semibold text-lg">₹{calculateRepayment().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#ECE8E3]/70">Potential Profit (25% margin)</span>
                    <span className="font-semibold text-lg text-green-400">₹{Math.round(calculateRepayment() * 0.25).toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-[#ECE8E3]/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#ECE8E3]/70">Items to Return (30%)</span>
                      <span className="font-semibold">{Math.round(stockQuantity * 0.3).toLocaleString()} items</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-200 transform hover:-translate-y-1">
                  Apply for Credit
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* How It Works - with arrow connectors */}
        <FadeInUp delay={400} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              How Credit-as-Inventory Works
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              A simple 5-step process that revolutionizes how retailers access inventory
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {howItWorks.map((item, index) => (
              <FadeInUp key={index} delay={500 + index * 100}>
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full flex items-center justify-center mx-auto mb-4 text-[#08070A] font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-3 text-[#D4AF37]">{item.title}</h3>
                  <p className="text-[#ECE8E3]/70 text-sm leading-relaxed">{item.description}</p>

                  {/* Arrow connector for md+ screens */}
                  {index < howItWorks.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 right-[-24px] transform -translate-y-1/2 w-6 h-6 text-[#FFD777] opacity-90 animate-pulse" />
                  )}
                </div>
              </FadeInUp>
            ))}
          </div>
        </FadeInUp>

        {/* Features */}
        <FadeInUp delay={600} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Why Choose Gallaa Credit?
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              Revolutionary approach to B2B credit that eliminates traditional lending risks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {creditFeatures.map((feature, index) => (
              <FadeInUp key={index} delay={700 + index * 100}>
                <div className="group p-8 bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#D4AF37]/30 group-hover:to-[#FFD777]/30 transition-all duration-300 animate-[pulse_3s_infinite]">
                    <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-[#ECE8E3]/70 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center text-[#D4AF37]">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature.benefit}</span>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </FadeInUp>

        {/* CTA Section */}
        <FadeInUp delay={800} className="text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 backdrop-blur-sm">
            <Target className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Ready to Transform Your Cash Flow?
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of retailers who have revolutionized their business with our credit-as-inventory model. 
              Get started today and experience the future of B2B commerce.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-200 transform hover:-translate-y-1">
                Apply for Credit Now
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
              <button className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-200 font-semibold">
                Schedule Demo
              </button>
            </div>

            <p className="text-[#ECE8E3]/60 mt-8 text-sm">
              No upfront costs • Instant approval • Risk-free trial
            </p>
          </div>
        </FadeInUp>

        {/* Ocagency Branding */}
        <FadeInUp delay={900} className="text-center mt-16">
          <OcagencyBranding />
        </FadeInUp>
      </div>
    </div>
  );
};

export default Credit;
