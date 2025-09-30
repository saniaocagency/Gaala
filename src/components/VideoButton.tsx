import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface VideoButtonProps {
  title: string;
  url: string;
  language: string;
  isChannel?: boolean;
}

const VideoButton: React.FC<VideoButtonProps> = ({ title, url, language, isChannel = false }) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD777]/20 border border-[#D4AF37]/30 rounded-xl p-4 hover:from-[#D4AF37]/30 hover:to-[#FFD777]/30 hover:border-[#D4AF37]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD777]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          {isChannel ? (
            <ExternalLink className="w-5 h-5 text-[#08070A]" />
          ) : (
            <Play className="w-5 h-5 text-[#08070A] ml-0.5" />
          )}
        </div>
        
        <div className="text-left">
          <div className="font-semibold text-[#ECE8E3] group-hover:text-[#D4AF37] transition-colors duration-200">
            {title}
          </div>
          <div className="text-sm text-[#ECE8E3]/60">
            {language}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse" />
    </button>
  );
};

export default VideoButton;