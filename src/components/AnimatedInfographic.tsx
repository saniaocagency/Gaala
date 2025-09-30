import React, { useState, useEffect } from 'react';
import { Factory, Building2, ShoppingCart, CreditCard, RotateCcw, ArrowRight } from 'lucide-react';

const AnimatedInfographic: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Factory,
      title: "Manufacturer",
      description: "Creates products and lists inventory on Gallaa",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Building2,
      title: "Gallaa Platform",
      description: "Matches products with retailers and provides credit",
      color: "from-[#D4AF37] to-[#FFD777]"
    },
    {
      icon: ShoppingCart,
      title: "Retailer",
      description: "Receives goods bundle as credit, not cash",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CreditCard,
      title: "Sales & Payment",
      description: "Retailer sells products and makes payments",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: RotateCcw,
      title: "Returns & Cycle",
      description: "Unsold items returned, cycle continues",
      color: "from-orange-500 to-orange-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
      <h3 className="text-2xl font-['Playfair_Display'] font-bold text-center mb-8">
        How Gallaa Credit Works
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
              index === currentStep 
                ? `bg-gradient-to-r ${step.color} scale-110 shadow-lg` 
                : 'bg-[#ECE8E3]/10 scale-100'
            }`}>
              <step.icon className={`w-8 h-8 transition-colors duration-500 ${
                index === currentStep ? 'text-white' : 'text-[#ECE8E3]/60'
              }`} />
            </div>
            
            <h4 className={`font-semibold mb-2 transition-colors duration-500 ${
              index === currentStep ? 'text-[#D4AF37]' : 'text-[#ECE8E3]'
            }`}>
              {step.title}
            </h4>
            
            <p className={`text-sm max-w-32 transition-colors duration-500 ${
              index === currentStep ? 'text-[#ECE8E3]' : 'text-[#ECE8E3]/60'
            }`}>
              {step.description}
            </p>
            
            {index < steps.length - 1 && (
              <ArrowRight className={`hidden md:block absolute -right-8 top-8 w-6 h-6 transition-colors duration-500 ${
                index === currentStep ? 'text-[#D4AF37]' : 'text-[#ECE8E3]/30'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8 space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep ? 'bg-[#D4AF37] w-8' : 'bg-[#ECE8E3]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedInfographic;