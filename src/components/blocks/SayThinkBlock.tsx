// components/SayThinkBlock.tsx
import React from "react";

interface SayThinkBlockProps {
  type: "say" | "think";
  message: string;
  seconds: number;
  onMessageChange: (val: string) => void;
  onSecondsChange: (val: number) => void;
  onRun: () => void;
  sumbmitBtnComponent?: "sidebar" | "action-drawer";
}

const SayThinkBlock: React.FC<SayThinkBlockProps> = ({
  type,
  message,
  seconds,
  onMessageChange,
  onSecondsChange,
  onRun,
  sumbmitBtnComponent = "sidebar",
}) => {
  return (
    <div
      className={`flex flex-col bg-purple-500 text-white px-2 py-2 my-2 text-sm rounded cursor-pointer w-full`}
    >
      <div className="flex items-center mb-2">
        {type === "say" ? "Say" : "Think"}
        <input
          type="text"
          value={message}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onMessageChange(e.target.value)}
          className="mx-2 px-1 text-black rounded-sm w-24"
        />
        for
        <input
          type="number"
          value={seconds}
          min={1}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onSecondsChange(Number(e.target.value))}
          className="mx-2 w-12 text-black text-center rounded-sm"
        />
        seconds
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRun();
        }}
        className="mt-1 self-start px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white text-xs rounded"
      >
        {sumbmitBtnComponent === "sidebar" ? "Run" : "Add"}
      </button>
    </div>
  );
};

export default SayThinkBlock;
