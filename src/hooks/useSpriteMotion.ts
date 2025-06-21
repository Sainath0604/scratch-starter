import { useState, useRef } from "react";
import { Block, Position } from "./types";

export const useSpriteMotion = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const previewRef = useRef<HTMLDivElement>(null);
  const spriteSize = { width: 100, height: 100 };

  const move = (steps: number) => {
    const pixelsPerStep = 5;
    const moveAmount = steps * pixelsPerStep;

    const containerWidth = previewRef.current?.offsetWidth ?? 0;
    const maxX = containerWidth - spriteSize.width;

    setPosition((prev) => ({
      ...prev,
      x: Math.min(prev.x + moveAmount, maxX),
    }));
  };

  const turn = (degrees: number) => {
    setRotation((prev) => prev + degrees);
  };

  const turnAnti = (degrees: number) => {
    setRotation((prev) => prev - degrees);
  };

  const goTo = (x: number, y: number) => {
    const container = previewRef.current;
    if (!container) return;

    const maxX = container.offsetWidth - spriteSize.width;
    const maxY = container.offsetHeight - spriteSize.height;

    setPosition({
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    });
  };

  const repeat = async (count: number, action: () => void, delay = 150) => {
    for (let i = 0; i < count; i++) {
      action();
      await new Promise((res) => setTimeout(res, delay));
    }
  };

  const runBlock = async (block: Block) => {
    switch (block.type) {
      case "move":
        await move(block.args.steps);
        break;
      case "turn":
        await turn(block.args.degrees);
        break;
      case "repeat":
        for (let i = 0; i < block.args.times; i++) {
          for (const child of block.children || []) {
            await runBlock(child);
          }
        }
        break;
    }
  };

  return {
    position,
    rotation,
    move,
    turn,
    turnAnti,
    goTo,
    repeat,
    previewRef,
  };
};
