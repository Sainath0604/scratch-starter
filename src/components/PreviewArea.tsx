import React from "react";
import CatSprite from "./CatSprite";

interface PreviewAreaProps {
  x: number;
  y: number;
  rotation: number;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ x, y, rotation }) => {
  return (
    <div className="flex-none h-full overflow-hidden p-2 relative w-full">
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        <CatSprite />
      </div>
    </div>
  );
};

export default PreviewArea;
