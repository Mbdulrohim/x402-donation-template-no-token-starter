import React from "react";

interface PieButtonProps {
  amount: string;
  onClick: () => void;
  selected?: boolean;
}

export function PieButton({ amount, onClick, selected = false }: PieButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-20 h-20 rounded-full flex items-center justify-center
        transition-all duration-300 transform hover:scale-105
        ${selected
          ? "bg-thanksgiving-orange border-4 border-[#d4a373] shadow-lg scale-110"
          : "bg-[#e6b89c] border-4 border-[#d4a373] hover:bg-[#d4a373]"}
      `}
      style={{
        boxShadow: selected ? "0 0 15px rgba(211, 84, 0, 0.5)" : "none"
      }}
    >
      {/* Pie Crust Pattern */}
      <div className="absolute inset-0 rounded-full border-dashed border-2 border-white/30"></div>

      {/* Steam effect if selected */}
      {selected && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce delay-0"></div>
          <div className="w-1 h-4 bg-white/40 rounded-full animate-bounce delay-100"></div>
          <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce delay-200"></div>
        </div>
      )}

      <div className="flex flex-col items-center z-10">
        <span className={`font-bold text-lg ${selected ? "text-white" : "text-[#5d4037]"}`}>
          ${amount}
        </span>
        <span className={`text-[10px] uppercase font-bold ${selected ? "text-white/80" : "text-[#5d4037]/70"}`}>
          Slice
        </span>
      </div>
    </button>
  );
}
