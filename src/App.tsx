import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useSpriteMotion } from "./hooks/useSpriteMotion";

const App: React.FC = () => {
  const { position, rotation, move, turn, turnAnti, goTo, repeat, previewRef } =
    useSpriteMotion();

  const handleRepeat = async (count: number) => {
    await repeat(count, () => move(1));
  };

  const handleRepeatAction = async (
    type: "move" | "turn",
    value: number,
    count: number
  ) => {
    await repeat(count, () => {
      if (type === "move") move(value);
      else turn(value);
    });
  };

  return (
    <div className="bg-blue-100 font-sans">
      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <div
          className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r 
        border-gray-200 rounded-tr-xl mr-2"
        >
          <Sidebar
            onMove={move}
            onTurn={turn}
            onTurnAnti={turnAnti}
            onGoTo={goTo}
            onRepeat={handleRepeat}
            onRepeatAction={handleRepeatAction}
          />
          <MidArea />
        </div>
        <div
          className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l 
        border-gray-200 rounded-tl-xl ml-2"
          ref={previewRef}
        >
          <PreviewArea x={position.x} y={position.y} rotation={rotation} />
        </div>
      </div>
    </div>
  );
};

export default App;
