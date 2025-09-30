import React, { useState } from 'react';
import { ChevronDown, Play, ExternalLink, Globe } from 'lucide-react';

interface VideoLink {
  title: string;
  url: string;
  language: string;
  isChannel?: boolean;
}

const VideoDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoLink | null>(null);

  const videoLinks: VideoLink[] = [
    {
      title: "How Gallaa Works",
      url: "https://www.youtube.com/watch?v=z5O3mfXGebg",
      language: "English"
    },
    {
      title: "गल्ला कैसे काम करता है",
      url: "https://www.youtube.com/watch?v=VjAvMm6cV9c",
      language: "Hindi"
    },
    {
      title: "கல்லா எப்படி வேலை செய்கிறது",
      url: "https://www.youtube.com/watch?v=MZbDfxYKYXs",
      language: "Tamil"
    },
    {
      title: "ಗಲ್ಲಾ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      url: "https://www.youtube.com/watch?v=tgbQP4i1s6o",
      language: "Kannada"
    },
    {
      title: "Gallaa Futures Channel",
      url: "https://www.youtube.com/@GallaaFutures",
      language: "Watch More Videos",
      isChannel: true
    }
  ];

  const handleVideoSelect = (video: VideoLink) => {
    setSelectedVideo(video);
    setIsOpen(false);
    
    // Rewarding animation before redirect
    const button = document.querySelector('.video-reward-animation');
    if (button) {
      button.classList.add('animate-pulse', 'scale-110');
      setTimeout(() => {
        window.open(video.url, '_blank', 'noopener,noreferrer');
        button.classList.remove('animate-pulse', 'scale-110');
      }, 500);
    } else {
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="video-reward-animation group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD777]/20 border-2 border-[#D4AF37]/30 rounded-xl hover:from-[#D4AF37]/30 hover:to-[#FFD777]/30 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-2 hover:scale-105 soft-glow min-w-[280px]"
      >
        <Globe className="w-5 h-5 mr-3 text-[#D4AF37] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 gentle-pulse" />
        <span className="text-[#ECE8E3] font-medium text-center flex-1">
          {selectedVideo ? selectedVideo.language : 'Choose Language'}
        </span>
        <ChevronDown className={`w-5 h-5 ml-3 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180 scale-110' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-[#08070A]/95 backdrop-blur-xl border-2 border-[#D4AF37]/40 rounded-2xl shadow-2xl shadow-[#D4AF37]/30 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300 hover-glow">
            {/* Decorative top border */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD777]" />
            
            <div className="p-2">
          {videoLinks.map((video, index) => (
            <button
              key={index}
              onClick={() => handleVideoSelect(video)}
              className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-[#D4AF37]/15 transition-all duration-300 group hover:-translate-y-0.5 hover:scale-[1.02] mb-1 last:mb-0"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full flex items-center justify-center mr-4 group-hover:scale-125 group-hover:rotate-3 transition-transform duration-300 soft-glow shadow-lg shadow-[#D4AF37]/30">
                {video.isChannel ? (
                  <ExternalLink className="w-5 h-5 text-[#08070A]" />
                ) : (
                  <Play className="w-5 h-5 text-[#08070A] ml-0.5" />
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-[#ECE8E3] group-hover:text-[#D4AF37] transition-colors duration-300 group-hover:glow-text">
                  {video.title}
                </div>
                <div className="text-sm text-[#ECE8E3]/60 mt-1">
                  {video.language}
                </div>
              </div>
            </button>
          ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDropdown;