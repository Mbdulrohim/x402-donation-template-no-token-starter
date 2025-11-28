"use client";

import { useEffect, useState } from "react";

const LeafIcon = ({ type, color }: { type: number; color: string }) => {
  if (type === 0) {
    // Maple leaf shape
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14 6L18 5L16 9L20 10L16 14L18 18L13 16L12 22L11 16L6 18L8 14L4 10L8 9L6 5L10 6L12 2Z" />
      </svg>
    );
  } else {
    // Oak leaf shape
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 14 4 14 6C14 8 16 8 16 10C16 12 14 14 14 16C14 18 12 22 12 22C12 22 10 18 10 16C10 14 8 12 8 10C8 8 10 8 10 6C10 4 12 2 12 2Z" />
      </svg>
    );
  }
};

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; type: number; color: string }>>([]);

  useEffect(() => {
    const count = 30;
    const newLeaves = [];
    const colors = ["#d35400", "#c0392b", "#f1c40f", "#5d4037", "#e67e22"];

    for (let i = 0; i < count; i++) {
      newLeaves.push({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 5 + 8}s`,
        animationDelay: `${Math.random() * 5}s`,
        type: Math.floor(Math.random() * 2),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.animationDelay,
          }}
        >
          <LeafIcon type={leaf.type} color={leaf.color} />
        </div>
      ))}
    </div>
  );
}
