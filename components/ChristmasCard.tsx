import React from "react";

interface ChristmasCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ChristmasCard({ children, className = "", title }: ChristmasCardProps) {
  return (
    <div className={`glass-panel rounded-xl p-6 relative overflow-hidden ${className}`}>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-christmas-gold rounded-tl-xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-christmas-gold rounded-tr-xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-christmas-gold rounded-bl-xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-christmas-gold rounded-br-xl opacity-50 pointer-events-none"></div>

      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-christmas-gold font-serif tracking-wider uppercase border-b border-christmas-gold/30 pb-2 inline-block">
            {title}
          </h2>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
