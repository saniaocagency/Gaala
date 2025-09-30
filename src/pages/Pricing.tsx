import React, { useState } from 'react';
import { useEffect } from 'react';
import { CheckCircle, Star, ArrowRight, CreditCard, Shield, Zap } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import MouseTrail from '../components/MouseTrail';

const Pricing: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 2999,
      annualPrice: 28790, // 20% discount
      period: isAnnual ? "/year" : "/month",
      description: "Perfect for small retailers getting started",
      features: [
        "Credit limit up to ₹5L",
        "50 transactions/month",
        "Basic analytics dashboard",
        "Email support",
        "Standard verification process",
        "Mobile app access",
        "GST invoice generation",
        "Basic payment gateway"
      ],
      cta: "Start Free Trial",
      popular: false,
      savings: isAnnual ? "Save ₹7,200 annually" : "Most affordable"
    },
    {
      name: "Professional",
      monthlyPrice: 7999,
      annualPrice: 76790, // 20% discount
      period: isAnnual ? "/year" : "/month",
      description: "Ideal for growing retail businesses",
      features: [
        "Credit limit up to ₹25L",
        "Unlimited transactions",
        "Advanced analytics & insights",
        "Priority phone & chat support",
        "Premium verification (24hrs)",
        "API access & integrations",
        "Bulk order management",
        "Custom payment terms",
        "Dedicated account manager",
        "Advanced reporting tools",
        "Multi-location support",
        "Inventory management tools"
      ],
      cta: "Most Popular",
      popular: true,
      savings: isAnnual ? "Save ₹19,200 annually" : "Best value"
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      period: "",
      description: "For large retailers and manufacturers",
      features: [
        "Credit limit up to ₹50L+",
        "Unlimited everything",
        "Custom analytics dashboard",
        "Dedicated account manager",
        "White-label solutions",
        "Custom API integrations",
        "SLA guarantees (99.9% uptime)",
        "Volume-based discounts",
        "Custom workflow automation",
        "Advanced security features",
        "Compliance management",
        "24/7 priority support"
      ],
      cta: "Contact Sales",
      popular: false,
      savings: "Custom pricing available"
    }
  ];

  const addOns = [
    {
      name: "Advanced Analytics",
      price: "₹1,999/month",
      description: "Deep insights, predictive analytics, and custom reports"
    },
    {
      name: "API Access",
      price: "₹999/month",
      description: "Full API access for custom integrations and automation"
    },
    {
      name: "Priority Support",
      price: "₹1,499/month",
      description: "24/7 phone support with dedicated account manager"
    },
    {
      name: "White Label",
      price: "₹4,999/month",
      description: "Custom branding and white-label marketplace solution"
    }
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "All plans come with a 14-day free trial that includes full access to features, up to 10 transactions, and email support. No credit card required."
    },
    {
      question: "How does the credit limit work?",
      answer: "Credit limits are determined by our AI-powered assessment based on your business profile, transaction history, and financial health. Limits can be increased as your business grows."
    },
    {
      question: "Are there any setup fees?",
      answer: "No setup fees for any plan. You only pay the monthly subscription fee. Enterprise plans may have custom implementation costs depending on requirements."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and bank transfers. All payments are processed securely through our PCI-compliant payment gateway."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No long-term contracts required. All plans are month-to-month. Annual subscriptions are available with additional discounts."
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice) return "Custom";
    return isAnnual ? `₹${plan.annualPrice?.toLocaleString()}` : `₹${plan.monthlyPrice.toLocaleString()}`;
  };

  const handlePayment = (planName: string) => {
    // Mock payment integration with reward animation
    const button = event?.target as HTMLElement;
    if (button) {
      button.classList.add('animate-pulse', 'scale-110');
      setTimeout(() => {
        alert(`Redirecting to payment for ${planName} plan...`);
        button.classList.remove('animate-pulse', 'scale-110');
      }, 500);
    }
  };

  return (
    <div className="px-6 py-8 relative">
      <MouseTrail />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/3 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <FadeInUp className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
            Transparent Pricing for Every Business
          </h1>
          <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your business needs. All plans include our core marketplace features with different credit and transaction limits.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-lg ${!isAnnual ? 'text-[#D4AF37] font-semibold' : 'text-[#ECE8E3]/70'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-[#ECE8E3]/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full transition-transform duration-200 ${
                isAnnual ? 'translate-x-8' : 'translate-x-0'
              }`} />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-[#D4AF37] font-semibold' : 'text-[#ECE8E3]/70'}`}>
              Annual
              <span className="ml-2 px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </FadeInUp>

        {/* Pricing Cards */}
        <FadeInUp delay={100} className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent scale-105 shadow-xl shadow-[#D4AF37]/20' 
                  : 'border-[#ECE8E3]/20 bg-[#ECE8E3]/5 hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/10'
              }`}>
                
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] text-sm font-bold rounded-full shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2">{plan.name}</h3>
                  <p className="text-[#ECE8E3]/70 mb-6">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                      {getPrice(plan)}
                    </span>
                    <span className="text-[#ECE8E3]/60 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-sm text-[#D4AF37] font-medium">{plan.savings}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-[#ECE8E3]/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handlePayment(plan.name)}
                  className={`reward-button w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 interactive-glow ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-2 hover:scale-110 soft-glow'
                      : 'border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] hover:-translate-y-1 hover:scale-105 hover-glow-enhanced'
                  }`}
                >
                  {plan.cta}
                  {plan.cta !== 'Most Popular' && <ArrowRight className="inline-block w-5 h-5 ml-2" />}
                </button>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Payment Methods */}
        <FadeInUp delay={200} className="mb-20">
          <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                Secure Payment Methods
              </h2>
              <p className="text-[#ECE8E3]/80">
                We support all major payment methods for your convenience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center p-6 bg-[#ECE8E3]/5 rounded-xl">
                <CreditCard className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Cards & UPI</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Credit cards, debit cards, and UPI payments</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-[#ECE8E3]/5 rounded-xl">
                <Shield className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Bank Transfer</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Direct bank transfers and net banking</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-[#ECE8E3]/5 rounded-xl">
                <Zap className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Instant Processing</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Real-time payment processing and confirmation</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Add-ons */}
        <FadeInUp delay={300} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Powerful Add-ons
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              Enhance your plan with additional features and services tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="p-6 bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/10">
                <h3 className="font-semibold mb-2">{addon.name}</h3>
                <p className="text-2xl font-bold text-[#D4AF37] mb-3">{addon.price}</p>
                <p className="text-[#ECE8E3]/70 text-sm leading-relaxed">{addon.description}</p>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* FAQ */}
        <FadeInUp delay={400} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#ECE8E3]/80">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8 hover:border-[#D4AF37]/20 transition-colors duration-200">
                <h3 className="font-semibold mb-4 text-lg text-[#D4AF37]">{faq.question}</h3>
                <p className="text-[#ECE8E3]/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Final CTA */}
        <FadeInUp delay={500} className="text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses already growing with Gallaa. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handlePayment('Professional')}
                className="reward-button px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 soft-glow"
              >
                Start Free Trial
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
              <button className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-300 font-semibold hover:-translate-y-1 hover:scale-105 hover-glow">
                Contact Sales
              </button>
            </div>

            <p className="text-[#ECE8E3]/60 mt-8 text-sm">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Pricing;