import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-full h-full"
}) => {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <span className="font-serif-luxury font-semibold text-lg sm:text-xl tracking-[0.1em] uppercase bg-gradient-to-br from-[#fcf3d9] via-[#d4af37] to-[#aa8120] bg-clip-text text-transparent pl-[0.1em]">
        SA
      </span>
    </div>
  );
};

