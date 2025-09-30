import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const OcagencyBranding: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open('https://ocagency.netlify.app', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group flex items-center px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD777]/10 border border-[#D4AF37]/20 rounded-lg hover:from-[#D4AF37]/20 hover:to-[#FFD777]/20 hover:border-[#D4AF37]/40 transition-all duration-200 hover:shadow-md hover:shadow-[#D4AF37]/20 hover:-translate-y-1 hover:scale-105"
      >
        <span className="text-sm text-[#ECE8E3]/80 group-hover:text-[#D4AF37] transition-colors duration-200">
          Made with Ocagency
        </span>
        <ExternalLink className="w-3 h-3 ml-2 text-[#D4AF37] group-hover:scale-110 transition-transform duration-200" />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 px-4 py-3 bg-[#08070A]/98 backdrop-blur-lg border border-[#D4AF37]/40 rounded-xl shadow-2xl shadow-[#D4AF37]/30 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-[#D4AF37] mb-2">Professional Web Services</h4>
            <p className="text-xs text-[#ECE8E3]/90 mb-3 leading-relaxed">
              Get professional websites, AI automation, digital marketing, and social media management services.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#ECE8E3]/70">
              <div>• Web Development</div>
              <div>• AI Automation</div>
              <div>• Digital Marketing</div>
              <div>• Social Media</div>
            </div>
            <p className="text-xs text-[#D4AF37] mt-2 font-medium">
              Click to visit ocagency.netlify.app
            </p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#D4AF37]/40"></div>
        </div>
      )}
    </div>
  );
};

export default OcagencyBranding;
