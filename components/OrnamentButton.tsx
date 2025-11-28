import React from "react";

interface OrnamentButtonProps {
  amount: string;
  onClick: () => void;
  selected?: boolean;
}

export function OrnamentButton({ amount, onClick, selected = false }: OrnamentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-16 h-16 rounded-full flex items-center justify-center
        transition-all duration-300 transform hover:scale-110
        ${selected
          ? "bg-christmas-red border-2 border-christmas-gold shadow-[0_0_15px_rgba(255,215,0,0.6)]"
          : "bg-white/10 border border-white/20 hover:bg-white/20"}
      `}
    >
      {/* Ornament Hanger */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-christmas-gold rounded-sm"></div>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 border-t-2 border-l-2 border-r-2 border-gray-400 rounded-t-full"></div>

      <span className={`font-bold text-lg ${selected ? "text-white" : "text-christmas-snow"}`}>
        ${amount}
      </span>

      {/* Shine effect */}
      <div className="absolute top-2 right-3 w-3 h-3 bg-white/40 rounded-full blur-[1px]"></div>
    </button>
  );
}
