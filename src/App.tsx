import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useSpriteMotion } from "./hooks/useSpriteMotion";
import { AnimationType, SpriteState } from "./types/sprite";
import { useSprites } from "./contexts/SpriteContext";

const App: React.FC = () => {
  const { move, turn, turnAnti, goTo, repeat, previewRef } = useSpriteMotion();

  const { sprites, selectedSpriteId, setSelectedSpriteId } = useSprites();

  useEffect(() => {
    if (!selectedSpriteId && sprites.length > 0) {
      setSelectedSpriteId(sprites[0].id);
    }
  }, [sprites, selectedSpriteId]);

  return (
    <div className="bg-blue-100 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-gray-200 rounded-t-xl mx-2">
          {/* Sidebar */}
          <Sidebar />

          {/* PreviewArea */}
          <div className="flex-1 h-full" ref={previewRef}>
            <PreviewArea
              sprites={sprites}
              selectedSpriteId={selectedSpriteId}
              onSelectSprite={setSelectedSpriteId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
