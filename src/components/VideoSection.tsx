import React from 'react';
import { Play, ExternalLink, Globe, Video, Users, Award } from 'lucide-react';

const VideoSection: React.FC = () => {
  const videoLinks = [
    {
      title: "How Gallaa Works",
      url: "https://www.youtube.com/watch?v=z5O3mfXGebg",
      language: "English",
      description: "Complete overview of our B2B marketplace platform",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "गल्ला कैसे काम करता है",
      url: "https://www.youtube.com/watch?v=VjAvMm6cV9c",
      language: "Hindi",
      description: "हमारे B2B मार्केटप्लेस प्लेटफॉर्म का संपूर्ण अवलोकन",
      thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "கல்லா எப்படி வேலை செய்கிறது",
      url: "https://www.youtube.com/watch?v=MZbDfxYKYXs",
      language: "Tamil",
      description: "எங்கள் B2B சந்தை தளத்தின் முழுமையான கண்ணோட்டம்",
      thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "ಗಲ್ಲಾ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      url: "https://www.youtube.com/watch?v=tgbQP4i1s6o",
      language: "Kannada",
      description: "ನಮ್ಮ B2B ಮಾರುಕಟ್ಟೆ ವೇದಿಕೆಯ ಸಂಪೂರ್ಣ ಅವಲೋಕನ",
      thumbnail: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const handleVideoClick = (url: string, title: string) => {
    // Add reward animation
    const clickedElement = document.activeElement as HTMLElement;
    if (clickedElement) {
      clickedElement.style.transform = 'scale(0.95)';
      setTimeout(() => {
        clickedElement.style.transform = '';
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 150);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleChannelClick = () => {
    window.open('https://www.youtube.com/@GallaaFutures', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Video className="w-8 h-8 text-[#D4AF37] mr-3" />
          <h3 className="text-2xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD777] bg-clip-text text-transparent">
            Watch in Your Language
          </h3>
        </div>
        <p className="text-[#ECE8E3]/70 max-w-2xl mx-auto">
          Discover how Gallaa is transforming B2B commerce across India. Choose your preferred language to get started.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {videoLinks.map((video, index) => (
          <div
            key={index}
            onClick={() => handleVideoClick(video.url, video.title)}
            className="group cursor-pointer bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2 hover:scale-105"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/10 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-8 h-8 text-[#08070A] ml-1" />
              </div>
              
              {/* Language Badge */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-[#08070A]/80 backdrop-blur-sm rounded-full">
                <span className="text-[#D4AF37] text-xs font-medium">{video.language}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                {video.title}
              </h4>
              <p className="text-[#ECE8E3]/60 text-sm leading-relaxed line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Channel CTA */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD777]/5 border border-[#D4AF37]/20 rounded-2xl hover:from-[#D4AF37]/20 hover:to-[#FFD777]/10 hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-[#D4AF37] mr-2" />
              <span className="font-semibold text-lg">Gallaa Futures Channel</span>
            </div>
            <p className="text-[#ECE8E3]/70 mb-4 max-w-md">
              Subscribe to our YouTube channel for the latest updates, tutorials, and success stories.
            </p>
            <button
              onClick={handleChannelClick}
              className="reward-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD777] text-[#08070A] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Channel
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-12 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-[#D4AF37] mb-1">50K+</div>
          <div className="text-[#ECE8E3]/60 text-sm">Views</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-[#D4AF37] mb-1">4.8★</div>
          <div className="text-[#ECE8E3]/60 text-sm">Rating</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-[#D4AF37] mb-1">2K+</div>
          <div className="text-[#ECE8E3]/60 text-sm">Subscribers</div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;