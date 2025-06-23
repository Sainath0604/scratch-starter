import React, { createContext, useContext, useState } from "react";
import { SpriteState } from "../types/sprite";
import { v4 as uuidv4 } from "uuid";

interface SpriteContextType {
  sprites: SpriteState[];
  selectedSpriteId: string | null;
  setSelectedSpriteId: (id: string | null) => void;
  resetSpritePosition: (id: string) => void;
  addSprite: (type: "cat" | "ball") => void;
  updateSprite: any;
}

const SpriteContext = createContext<SpriteContextType | undefined>(undefined);

export const SpriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sprites, setSprites] = useState<SpriteState[]>([
    {
      id: uuidv4(),
      name: "Sprite 1",
      x: 0,
      y: 0,
      rotation: 0,
      bubble: null,
      animationQueue: [],
      type: "cat",
    },
  ]);
  const [selectedSpriteId, setSelectedSpriteId] = useState<string | null>(null);

  const addSprite = (type: "cat" | "ball") => {
    const yOffset = sprites.length * 100;
    const newSprite: SpriteState = {
      id: uuidv4(),
      name: `Sprite ${sprites.length + 1}`,
      x: 100, // Start at visible position
      y: 100 + yOffset,
      rotation: 0,
      bubble: null,
      animationQueue: [],
      type,
    };
    setSprites((prev) => [...prev, newSprite]);
  };

  const updateSprite = (id: string, updates: Partial<SpriteState>) => {
    setSprites((prev) =>
      prev.map((sprite) =>
        sprite.id === id ? { ...sprite, ...updates } : sprite
      )
    );
  };

  const resetSpritePosition = (id: string) => {
    setSprites((prev) =>
      prev.map((sprite) =>
        sprite.id === id ? { ...sprite, x: 0, y: 0 } : sprite
      )
    );
  };

  return (
    <SpriteContext.Provider
      value={{
        sprites,
        selectedSpriteId,
        setSelectedSpriteId,
        resetSpritePosition,
        addSprite,
        updateSprite,
      }}
    >
      {children}
    </SpriteContext.Provider>
  );
};

export const useSprites = () => {
  const context = useContext(SpriteContext);
  if (!context)
    throw new Error("useSprites must be used within a SpriteProvider");
  return context;
};
