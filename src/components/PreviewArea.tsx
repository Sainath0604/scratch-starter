import React from "react";
import CatSprite from "./CatSprite";

interface PreviewAreaProps {
  x: number;
  y: number;
  rotation: number;
  bubble: null | { type: "say" | "think"; text: string };
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  x,
  y,
  rotation,
  bubble,
}) => {
  return (
    <div className="flex-none h-full overflow-hidden p-2 relative w-full">
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          top: "50%",
          left: "15%",
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* Bubbles */}
        {bubble?.type === "say" && (
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
            <div className="bg-pink-500 text-white text-sm px-4 py-2 rounded-lg relative">
              {bubble.text}
              {/* Triangle tail */}
              {/* <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-500"></div> */}
            </div>
          </div>
        )}

        {bubble?.type === "think" && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
            <div className="bg-gray-500 text-white text-sm px-4 py-2 rounded-full">
              {bubble.text}
            </div>
            {/* trailing thought dots */}
            <div className="flex gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-gray-500 opacity-70" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 opacity-50" />
              <div className="w-1 h-1 rounded-full bg-gray-500 opacity-30" />
            </div>
          </div>
        )}

        {/* Sprite */}
        <CatSprite />
      </div>
    </div>
  );
};

export default PreviewArea;
