import { useState, useCallback } from "react";
import { SpriteState, AnimationType } from "../types/sprite";
import { v4 as uuidv4 } from "uuid";

export const useSprites = () => {
  const [sprites, setSprites] = useState<SpriteState[]>([
    {
      id: uuidv4(),
      name: "Cat Sprite 1",
      x: 0,
      y: 0,
      rotation: 0,
      bubble: null,
      animationQueue: [],
    },
  ]);

  // Add new sprite with vertical spacing
  const addSprite = () => {
    const yOffset = sprites.length * 100;
    const newSprite: SpriteState = {
      id: uuidv4(),
      name: `Cat Sprite ${sprites.length + 1}`,
      x: 0,
      y: yOffset,
      rotation: 0,
      bubble: null,
      animationQueue: [],
    };
    setSprites((prev) => [...prev, newSprite]);
  };

  // Update sprite by merging with partial state or functional update
  const updateSprite = useCallback(
    (
      id: string,
      update:
        | Partial<SpriteState>
        | ((prev: SpriteState) => Partial<SpriteState>)
    ) => {
      setSprites((prevSprites) =>
        prevSprites.map((sprite) =>
          sprite.id === id
            ? {
                ...sprite,
                ...(typeof update === "function" ? update(sprite) : update),
              }
            : sprite
        )
      );
    },
    []
  );

  // Fully replace sprite using function
  const updateSpriteWithFn = useCallback(
    (id: string, fn: (sprite: SpriteState) => SpriteState) => {
      setSprites((prev) =>
        prev.map((sprite) => (sprite.id === id ? fn(sprite) : sprite))
      );
    },
    []
  );

  // Reset all bubbles
  const resetBubbles = useCallback(() => {
    setSprites((prev) => prev.map((sprite) => ({ ...sprite, bubble: null })));
  }, []);

  // Add animation to queue for specific sprite
  const updateAnimationQueue = useCallback(
    (id: string, step: AnimationType) => {
      setSprites((prev) =>
        prev.map((sprite) =>
          sprite.id === id
            ? { ...sprite, animationQueue: [...sprite.animationQueue, step] }
            : sprite
        )
      );
    },
    []
  );

  // Run all queued animations per sprite
  const animateAllSprites = useCallback(async () => {
    for (const sprite of sprites) {
      for (const step of sprite.animationQueue) {
        await new Promise((r) => setTimeout(r, 300));

        updateSpriteWithFn(sprite.id, (prev) => {
          if (step.type === "move") {
            return { ...prev, x: prev.x + step.value };
          }
          if (step.type === "turn") {
            return { ...prev, rotation: prev.rotation + step.value };
          }
          return prev;
        });
      }
    }

    checkAndSwapIfCollided();
  }, [sprites, updateSpriteWithFn]);

  // Collision detection (distance-based)
  const checkAndSwapIfCollided = useCallback(() => {
    if (sprites.length < 2) return;

    const [sprite1, sprite2] = sprites;

    const distance = Math.sqrt(
      Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2)
    );

    if (distance < 50) {
      swapQueues(sprite1.id, sprite2.id);
    }
  }, [sprites]);

  // Swap animation queues between 2 sprites
  const swapQueues = useCallback((id1: string, id2: string) => {
    setSprites((prev) => {
      const s1 = prev.find((s) => s.id === id1)!;
      const s2 = prev.find((s) => s.id === id2)!;

      return prev.map((s) => {
        if (s.id === id1) return { ...s, animationQueue: s2.animationQueue };
        if (s.id === id2) return { ...s, animationQueue: s1.animationQueue };
        return s;
      });
    });
  }, []);

  const updateSpritePosition = (id: string, x: number, y: number) => {
    setSprites((prev) =>
      prev.map((sprite) => (sprite.id === id ? { ...sprite, x, y } : sprite))
    );
  };

  const resetSpritePosition = (id: string) => {
    setSprites((prev) =>
      prev.map((sprite) =>
        sprite.id === id ? { ...sprite, x: 0, y: 0 } : sprite
      )
    );
  };

  return {
    sprites,
    addSprite,
    updateSprite,
    updateSpriteWithFn,
    resetBubbles,
    updateAnimationQueue,
    animateAllSprites,
    updateSpritePosition,
    resetSpritePosition,
  };
};
