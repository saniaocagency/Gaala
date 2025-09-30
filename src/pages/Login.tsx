import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Award } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import MouseTrail from '../components/MouseTrail';
import MouseGlow from '../components/MouseGlow';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex bg-[#08070A] text-[#ECE8E3] relative overflow-hidden">
      <MouseTrail />
      <MouseGlow />
      {/* Left Side Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/10 items-center justify-center p-12 relative">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#D4AF37] to-[#FFD777] rounded-2xl flex items-center justify-center shadow-xl shadow-[#D4AF37]/30 mb-8">
            <Award className="w-10 h-10 text-[#08070A]" />
          </div>
          <h2 className="text-4xl font-['Playfair_Display'] font-bold mb-4 leading-tight">
            India’s Premier <span className="text-[#D4AF37]">Luxury B2B</span> Platform
          </h2>
          <p className="text-[#ECE8E3]/70 text-lg leading-relaxed">
            Trade with confidence. Access curated inventory and credit solutions tailored for modern businesses.
          </p>
        </div>
      </div>

      {/* Right Side Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-md">
          <FadeInUp>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-3">
                Welcome Back
              </h1>
              <p className="text-[#ECE8E3]/60">Sign in to continue to Gallaa</p>
            </div>
          </FadeInUp>

          <FadeInUp delay={100}>
            <div className="bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8 shadow-xl shadow-black/20 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/40 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ECE8E3]/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 text-[#ECE8E3] placeholder-[#ECE8E3]/40 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ECE8E3]/50 hover:text-[#D4AF37] transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me / Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-[#ECE8E3]/30 bg-[#ECE8E3]/10 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="ml-2 text-sm text-[#ECE8E3]/70">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#D4AF37] hover:text-[#FFD777] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  className="reward-button w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>

              {/* Social Logins */}
              <div className="mt-8">
                <div className="text-center text-sm text-[#ECE8E3]/50 mb-4">Or continue with</div>
                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 hover:border-[#D4AF37]/50 hover:bg-[#ECE8E3]/15 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm">Google</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-[#ECE8E3]/10 border border-[#ECE8E3]/20 hover:border-[#D4AF37]/50 hover:bg-[#ECE8E3]/15 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105">
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-8 text-center text-xs text-[#ECE8E3]/50">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-[#D4AF37] hover:text-[#FFD777]">Terms</Link> and{' '}
                <Link to="/privacy" className="text-[#D4AF37] hover:text-[#FFD777]">Privacy Policy</Link>.
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="mt-6 text-center text-sm">
              <p>
                Don’t have an account?{' '}
                <Link to="/register" className="text-[#D4AF37] hover:text-[#FFD777] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </div>
  );
};

export default Login;