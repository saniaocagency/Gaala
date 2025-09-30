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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="video-reward-animation group flex items-center px-8 py-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD777]/20 border-2 border-[#D4AF37]/30 rounded-xl hover:from-[#D4AF37]/30 hover:to-[#FFD777]/30 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-2 hover:scale-105 soft-glow"
      >
        <Globe className="w-5 h-5 mr-3 text-[#D4AF37] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 gentle-pulse" />
        <span className="text-[#ECE8E3] font-medium">
          {selectedVideo ? selectedVideo.language : 'Choose Language'}
        </span>
        <ChevronDown className={`w-5 h-5 ml-3 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180 scale-110' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#08070A]/98 backdrop-blur-lg border border-[#ECE8E3]/20 rounded-xl shadow-2xl shadow-[#D4AF37]/20 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300 hover-glow">
          {videoLinks.map((video, index) => (
            <button
              key={index}
              onClick={() => handleVideoSelect(video)}
              className="w-full flex items-center px-6 py-4 hover:bg-[#D4AF37]/10 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full flex items-center justify-center mr-4 group-hover:scale-125 group-hover:rotate-3 transition-transform duration-300 soft-glow">
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
                <div className="text-sm text-[#ECE8E3]/60">
                  {video.language}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoDropdown;