import React from "react";

interface ThanksgivingCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ThanksgivingCard({ children, className = "", title }: ThanksgivingCardProps) {
  return (
    <div className={`rustic-card rounded-xl p-8 relative ${className}`}>
      {/* Decorative corners - Wheat/Harvest style */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-thanksgiving-orange rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-thanksgiving-orange rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-thanksgiving-orange rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-thanksgiving-orange rounded-br-lg"></div>

      {title && (
        <div className="text-center mb-8 relative">
          <h2 className="text-3xl font-bold text-thanksgiving-brown font-serif tracking-wide relative z-10 inline-block px-4 bg-white dark:bg-[#3e2723]">
            {title}
          </h2>
          <div className="absolute top-1/2 left-0 w-full h-px bg-thanksgiving-orange/30 -z-0"></div>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
