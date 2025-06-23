import React from "react";

const BallSprite: React.FC = () => {
  return (
    <svg width="80" height="80">
      {/* Outer ball */}
      <circle
        cx="40"
        cy="40"
        r="30"
        fill="#4A90E2"
        stroke="black"
        strokeWidth="2"
      />

      {/* Center pentagon */}
      <polygon points="40,25 47,30 44,38 36,38 33,30" fill="black" />

      {/* Radiating lines (like soccer ball edges) */}
      <line x1="40" y1="25" x2="40" y2="10" stroke="black" strokeWidth="1.5" />
      <line x1="47" y1="30" x2="60" y2="25" stroke="black" strokeWidth="1.5" />
      <line x1="44" y1="38" x2="54" y2="45" stroke="black" strokeWidth="1.5" />
      <line x1="36" y1="38" x2="26" y2="45" stroke="black" strokeWidth="1.5" />
      <line x1="33" y1="30" x2="20" y2="25" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

export default BallSprite;
