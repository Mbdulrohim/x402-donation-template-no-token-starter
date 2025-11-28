"use client";

import { useEffect, useState } from "react";

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; fontSize: string }>>([]);

  useEffect(() => {
    const count = 50;
    const newSnowflakes = [];

    for (let i = 0; i < count; i++) {
      newSnowflakes.push({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 10 + 10}px`,
      });
    }

    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
