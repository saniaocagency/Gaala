import React from 'react';
import { useEffect } from 'react';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Heart,
  Target,
  Lightbulb,
  CheckCircle,
  Factory,
  Store,
  CreditCard,
  Zap
} from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import OcagencyBranding from '../components/OcagencyBranding';
import MouseTrail from '../components/MouseTrail';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '500+', label: 'Verified Manufacturers', icon: Factory },
    { number: '2,000+', label: 'Active Retailers', icon: Store },
    { number: '₹50Cr+', label: 'Transaction Volume', icon: CreditCard },
    { number: '25+', label: 'Cities Covered', icon: Globe }
  ];

  const challenges = [
    {
      category: "Manufacturing Hurdles",
      icon: Factory,
      problems: [
        "Raw material price volatility",
        "Complex supply chain management", 
        "Seasonal demand fluctuations",
        "Credit crunch affecting production",
        "Delayed payments from retailers"
      ]
    },
    {
      category: "Retail Obstacles", 
      icon: Store,
      problems: [
        "Limited local demand patterns",
        "Intense price wars with competitors",
        "E-commerce platform pressure",
        "Cash flow and payment issues",
        "Inventory management challenges"
      ]
    }
  ];

  const solutions = [
    {
      title: "Real-Time Payment Settlement",
      description: "Daily settlement model that restores immediate cash flow for all parties",
      icon: Zap
    },
    {
      title: "Unified Platform Ecosystem",
      description: "Single platform connecting manufacturers, retailers, and financial services",
      icon: Globe
    },
    {
      title: "Complete Transparency",
      description: "Full visibility into transactions, inventory, and payment status for all stakeholders",
      icon: Shield
    },
    {
      title: "Credit-as-Inventory Innovation",
      description: "Revolutionary model where retailers receive goods instead of cash loans",
      icon: Lightbulb
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '15+ years in luxury retail and fintech. Previously led digital transformation at major Indian conglomerates.'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former tech lead at top fintech companies. Expert in AI/ML and scalable marketplace architectures.'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Credit',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '12+ years in banking and credit assessment. Previously VP at leading Indian banks and NBFCs.'
    },
    {
      name: 'Sneha Gupta',
      role: 'VP Operations',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Operations expert with deep understanding of luxury supply chains and B2B marketplace dynamics.'
    }
  ];

  return (
    <div className="px-6 py-8 relative">
      <MouseTrail />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/3 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <FadeInUp className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
            About Gallaa
          </h1>
          <p className="text-xl text-[#ECE8E3]/80 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing India's B2B commerce ecosystem by solving the fundamental challenges 
            that have plagued manufacturers and retailers for decades.
          </p>
        </FadeInUp>

        {/* Stats */}
        <FadeInUp delay={100} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-[#D4AF37]/30 group-hover:to-[#FFD777]/30 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">{stat.number}</div>
                <div className="text-[#ECE8E3]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Decoding the Business of Credit */}
        <FadeInUp delay={200} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Decoding the Business of Credit
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              Understanding the core challenges that drive our innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {challenges.map((challenge, index) => (
              <FadeInUp key={index} delay={300 + index * 100}>
                <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-xl flex items-center justify-center mr-4">
                      <challenge.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-['Playfair_Display'] font-semibold">{challenge.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {challenge.problems.map((problem, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-[#ECE8E3]/70">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            ))}
          </div>
        </FadeInUp>

        {/* Gallaa's Solution */}
        <FadeInUp delay={400} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Gallaa's Revolutionary Solution
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              How we're transforming B2B commerce with innovative technology and financial models
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <FadeInUp key={index} delay={500 + index * 100}>
                <div className="group p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-2xl hover:from-[#D4AF37]/10 hover:to-[#FFD777]/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#D4AF37]/30 group-hover:to-[#FFD777]/30 transition-all duration-300">
                    <solution.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{solution.title}</h3>
                  <p className="text-[#ECE8E3]/70 leading-relaxed">{solution.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </FadeInUp>

        {/* Game Changer Section */}
        <FadeInUp delay={600} className="mb-20">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 text-center backdrop-blur-sm">
            <Zap className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              The GAME CHANGER: Daily Settlement Model
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Our revolutionary daily settlement model restores immediate cash flow for all stakeholders. 
              Unlike traditional 30-90 day payment cycles, Gallaa ensures real-time settlements, 
              eliminating cash flow bottlenecks that have crippled B2B commerce for decades.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-[#ECE8E3]/5 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Manufacturers</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Get paid within 24 hours of product delivery</p>
              </div>
              <div className="bg-[#ECE8E3]/5 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Retailers</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Access inventory without upfront capital investment</p>
              </div>
              <div className="bg-[#ECE8E3]/5 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-[#D4AF37] mb-4" />
                <h3 className="font-semibold mb-2">Platform</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Transparent, automated settlement process</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Team */}
        <FadeInUp delay={700} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 max-w-3xl mx-auto">
              Experienced leaders from luxury retail, fintech, and technology sectors driving innovation in B2B commerce
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <FadeInUp key={index} delay={800 + index * 100}>
                <div className="group text-center bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#ECE8E3]/10 group-hover:border-[#D4AF37]/30 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#D4AF37] font-medium mb-3">{member.role}</p>
                  <p className="text-[#ECE8E3]/70 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </FadeInUp>

        {/* Mission & Vision */}
        <FadeInUp delay={900} className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-[#ECE8E3]/80 leading-relaxed">
                To democratize access to B2B commerce by creating India's most trusted marketplace that empowers 
                manufacturers and retailers with innovative credit solutions, transparent pricing, and seamless transactions.
              </p>
            </div>

            <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">Our Vision</h2>
              <p className="text-[#ECE8E3]/80 leading-relaxed">
                To become the backbone of India's economy by building the most comprehensive B2B ecosystem that connects 
                every stakeholder in the value chain through technology, innovation, and financial inclusion.
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* Recognition */}
        <FadeInUp delay={1000} className="mb-20">
          <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                Recognition & Certifications
              </h2>
              <p className="text-xl text-[#ECE8E3]/80">
                Trusted by industry leaders and certified by global standards
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2">ISO 27001 Certified</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Information security management system certification</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2">PCI DSS Compliant</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Payment card industry data security standards</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2">Startup India</h3>
                <p className="text-[#ECE8E3]/70 text-sm">Recognized by Government of India's Startup India initiative</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={1100} className="text-center mb-20">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
              Join the Revolution
            </h2>
            <p className="text-xl text-[#ECE8E3]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be part of India's B2B commerce transformation. Whether you're a manufacturer, retailer, 
              or looking to join our team, we'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="reward-button px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-200 transform hover:-translate-y-1 interactive-glow">
                Get Started Today
              </button>
              <button className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08070A] rounded-xl transition-all duration-200 font-semibold hover-glow-enhanced interactive-glow">
                Contact Us
              </button>
            </div>
          </div>
        </FadeInUp>

        {/* Ocagency Section */}
        <FadeInUp delay={1200} className="mb-20">
          <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
                Powered by Ocagency
              </h2>
              <p className="text-xl text-[#ECE8E3]/80">
                Professional web development, AI automation, and digital marketing solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">About Ocagency</h3>
                <p className="text-[#ECE8E3]/80 leading-relaxed mb-6">
                  Ocagency is a full-service digital agency specializing in professional web development, 
                  AI automation, digital marketing, and social media management. We help businesses transform 
                  their digital presence and automate their operations for maximum efficiency and growth.
                </p>
                <ul className="space-y-2 text-[#ECE8E3]/70">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-3" />
                    Custom Web Development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-3" />
                    AI Automation & Chatbots
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-3" />
                    Digital Marketing & SEO
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-3" />
                    Social Media Management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-3" />
                    E-commerce Solutions
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD777]/5 rounded-2xl p-8 mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Transform Your Digital Presence</h4>
                  <p className="text-[#ECE8E3]/70 mb-6">
                    Ready to elevate your business with professional web development, AI automation, 
                    and comprehensive digital marketing strategies? Contact Ocagency today.
                  </p>
                  <div className="flex justify-center">
                    <OcagencyBranding />
                  </div>
                </div>
                
                <div className="text-sm text-[#ECE8E3]/60 space-y-1">
                  <p><strong>Services:</strong> Web Dev • AI Automation • Digital Marketing • Social Media</p>
                  <p><strong>Contact:</strong> hello@ocagency.com</p>
                  <p>Visit: ocagency.netlify.app</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default About;