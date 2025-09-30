import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building, 
  FileText, 
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import MouseTrail from '../components/MouseTrail';
import MouseGlow from '../components/MouseGlow';

const Register: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'manufacturer' | 'retailer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Business Info
    businessName: '',
    contactPerson: '',
    gstNumber: '',
    panNumber: '',
    
    // Additional Info
    annualRevenue: '',
    businessType: '',
    storeLocations: '',
    expectedVolume: '',
    
    // Agreement
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', { userType, ...formData });
  };

  const steps = [
    { number: 1, title: 'Account Type', description: 'Choose your business type' },
    { number: 2, title: 'Basic Info', description: 'Account credentials' },
    { number: 3, title: 'Business Details', description: 'Company information' },
    { number: 4, title: 'Verification', description: 'Complete setup' }
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-[#08070A] text-[#ECE8E3] relative">
      <MouseTrail />
      <MouseGlow />
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <FadeInUp className="text-center mb-8">
          <img 
            src="https://i.ibb.co/LzTVQ9cj/Gallalogo.png" 
            alt="Gallaa Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
        </FadeInUp>

        <FadeInUp>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4">
              Join Gallaa
            </h1>
            <p className="text-[#ECE8E3]/80">
              Create your account and start trading in India's premier luxury marketplace
            </p>
          </div>
        </FadeInUp>

        {/* Progress Steps */}
        <FadeInUp delay={100}>
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A]'
                      : 'bg-[#ECE8E3]/10 text-[#ECE8E3]/50'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-[#D4AF37]' : 'bg-[#ECE8E3]/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{steps[currentStep - 1].title}</h2>
              <p className="text-[#ECE8E3]/70">{steps[currentStep - 1].description}</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={200}>
          <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Account Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-4">What type of business are you?</h3>
                    <p className="text-[#ECE8E3]/70">Choose the option that best describes your business</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setUserType('manufacturer')}
                      className={`p-8 border-2 rounded-xl transition-all duration-300 text-left ${
                        userType === 'manufacturer'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-[#ECE8E3]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <Building className="w-12 h-12 text-[#D4AF37] mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Manufacturer</h4>
                      <p className="text-[#ECE8E3]/70">
                        I create and produce luxury goods and want to sell to retailers
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-[#ECE8E3]/60">
                        <li>• Access to verified retailer network</li>
                        <li>• Bulk order management</li>
                        <li>• Working capital solutions</li>
                      </ul>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserType('retailer')}
                      className={`p-8 border-2 rounded-xl transition-all duration-300 text-left ${
                        userType === 'retailer'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-[#ECE8E3]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <User className="w-12 h-12 text-[#D4AF37] mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Retailer</h4>
                      <p className="text-[#ECE8E3]/70">
                        I sell luxury goods to customers and want to source from manufacturers
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-[#ECE8E3]/60">
                        <li>• Access to verified manufacturers</li>
                        <li>• Credit-backed purchasing</li>
                        <li>• Competitive wholesale pricing</li>
                      </ul>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Basic Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ECE8E3]/50"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ECE8E3]/50"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Business Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {userType === 'manufacturer' ? 'Company Name' : 'Business Name'}
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                        placeholder={userType === 'manufacturer' ? 'Your company name' : 'Your business name'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                        placeholder="Primary contact person"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">GST Number</label>
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">PAN Number</label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                        placeholder="ABCDE1234F"
                      />
                    </div>

                    {userType === 'manufacturer' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Annual Revenue (₹)</label>
                        <select
                          name="annualRevenue"
                          value={formData.annualRevenue}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] transition-all duration-200"
                        >
                          <option value="" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Select range</option>
                          <option value="50L-1Cr" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>₹50L - ₹1Cr</option>
                          <option value="1Cr-5Cr" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>₹1Cr - ₹5Cr</option>
                          <option value="5Cr-10Cr" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>₹5Cr - ₹10Cr</option>
                          <option value="10Cr+" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>₹10Cr+</option>
                        </select>
                      </div>
                    )}

                    {userType === 'retailer' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Business Type</label>
                          <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] transition-all duration-200"
                          >
                            <option value="" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Select type</option>
                            <option value="retail" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Retail Store</option>
                            <option value="wholesale" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Wholesale</option>
                            <option value="online" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Online Store</option>
                            <option value="hybrid" style={{ backgroundColor: '#08070A', color: '#ECE8E3' }}>Hybrid</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Number of Store Locations</label>
                          <input
                            type="number"
                            name="storeLocations"
                            value={formData.storeLocations}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded-lg focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/50 transition-all duration-200"
                            placeholder="1"
                            min="1"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Almost Done!</h3>
                    <p className="text-[#ECE8E3]/70">Review your information and complete registration</p>
                  </div>

                  <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Registration Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#ECE8E3]/70">Account Type:</span>
                        <span className="capitalize">{userType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ECE8E3]/70">Email:</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ECE8E3]/70">Business Name:</span>
                        <span>{formData.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ECE8E3]/70">GST Number:</span>
                        <span>{formData.gstNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-[#D4AF37] bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded focus:ring-[#D4AF37] focus:ring-2 mt-1"
                      />
                      <span className="ml-3 text-sm text-[#ECE8E3]/80">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#D4AF37] hover:text-[#FFD777] transition-colors">
                          Terms of Service
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToPrivacy"
                        checked={formData.agreeToPrivacy}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-[#D4AF37] bg-[#ECE8E3]/10 border-2 border-[#ECE8E3]/30 rounded focus:ring-[#D4AF37] focus:ring-2 mt-1"
                      />
                      <span className="ml-3 text-sm text-[#ECE8E3]/80">
                        I agree to the{' '}
                        <Link to="/privacy" className="text-[#D4AF37] hover:text-[#FFD777] transition-colors">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 border-2 border-[#ECE8E3]/30 hover:border-[#D4AF37] hover:bg-[#ECE8E3]/5 rounded-lg transition-all duration-200 text-[#ECE8E3]"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentStep === 1 && !userType}
                      className="reward-button px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 flex items-center transform"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.agreeToTerms || !formData.agreeToPrivacy}
                      className="reward-button px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 flex items-center transform"
                    >
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {currentStep === 1 && (
              <div className="mt-8 text-center">
                <p className="text-[#ECE8E3]/70">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#D4AF37] hover:text-[#FFD777] transition-colors font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Register;