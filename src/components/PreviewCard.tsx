import React from 'react';
import { ArrowRight, Video as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PreviewCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  features: string[];
}

const PreviewCard: React.FC<PreviewCardProps> = ({ title, description, icon: Icon, link, features }) => {
  return (
    <div className="group bg-[#ECE8E3]/5 border border-[#ECE8E3]/10 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:-translate-y-2">
      <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD777]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#D4AF37]/30 group-hover:to-[#FFD777]/30 transition-all duration-300">
        <Icon className="w-8 h-8 text-[#D4AF37]" />
      </div>
      
      <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-[#ECE8E3]/70 mb-6 leading-relaxed">
        {description}
      </p>
      
      <ul className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-[#ECE8E3]/60">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Link
        to={link}
        className="inline-flex items-center text-[#D4AF37] hover:text-[#FFD777] transition-colors duration-300 font-medium"
      >
        Learn More
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default PreviewCard;