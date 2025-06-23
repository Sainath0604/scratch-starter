import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import CatSprite from "../svg/CatSprite";
import BallSprite from "../svg/BallSprite";
import ActionDrawer from "./ActionDrawer";
import { SpriteState } from "../types/sprite";
import { useSprites } from "../contexts/SpriteContext";
import { useActionContext } from "../contexts/ActionContext";
import { executeAction } from "../utils/executeAction";

interface PreviewAreaProps {
  sprites: SpriteState[];
  onSelectSprite: (id: string) => void;
  selectedSpriteId: string | null;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  sprites,
  onSelectSprite,
  selectedSpriteId,
}) => {
  const { resetSpritePosition, updateSprite } = useSprites();
  const { getActionsForSprite } = useActionContext();
  const previewRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrag = (e: React.MouseEvent, sprite: SpriteState) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = sprite.x;
    const initialY = sprite.y;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newX = initialX + dx;
      let newY = initialY + dy;

      const preview = previewRef.current;
      if (preview) {
        const rect = preview.getBoundingClientRect();
        const spriteWidth = 100;
        const spriteHeight = 100;

        const maxX = rect.width / 2 - spriteWidth / 2;
        const minX = -rect.width / 2 + spriteWidth / 2;
        const maxY = rect.height / 2 - spriteHeight / 2;
        const minY = -rect.height / 2 + spriteHeight / 2;

        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));
      }

      updateSprite(selectedSpriteId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const selectedSprite = sprites.find((s) => s.id === selectedSpriteId);

  const playActions = async () => {
    if (!selectedSpriteId) return;
    const sprite = sprites.find((s) => s.id === selectedSpriteId);
    if (!sprite) return;

    const actions = getActionsForSprite(selectedSpriteId);

    for (const action of actions) {
      switch (action.type) {
        case "move":
        case "turn":
        case "goTo": {
          const updated = executeAction(sprite, action);
          updateSprite(sprite.id, {
            x: updated.x ?? sprite.x,
            y: updated.y ?? sprite.y,
            rotation: updated.rotation ?? sprite.rotation,
          });
          break;
        }

        case "say": {
          updateSprite(sprite.id, {
            bubble: { type: "say", text: action.value },
          });
          await new Promise((res) =>
            setTimeout(res, (action.duration || 2) * 1000)
          );
          updateSprite(sprite.id, { bubble: null });
          break;
        }

        case "think": {
          updateSprite(sprite.id, {
            bubble: { type: "think", text: action.value },
          });
          await new Promise((res) =>
            setTimeout(res, (action.duration || 2) * 1000)
          );
          updateSprite(sprite.id, { bubble: null });
          break;
        }

        case "repeat": {
          for (let i = 0; i < action.count; i++) {
            const nested = { ...action.action };
            const updated = executeAction(sprite, nested);
            updateSprite(sprite.id, {
              x: updated.x ?? sprite.x,
              y: updated.y ?? sprite.y,
              rotation: updated.rotation ?? sprite.rotation,
            });
            await new Promise((res) => setTimeout(res, 300));
          }
          break;
        }

        default:
          console.warn("Unknown action type", action);
      }

      // short pause between all actions
      await new Promise((res) => setTimeout(res, 300));
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Header Info */}
      <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
        <div>
          {selectedSprite ? (
            <p className="text-sm font-medium">
              <span className="text-blue-600">{selectedSprite.name}</span> | X:{" "}
              {Math.round(selectedSprite.x)} | Y: {Math.round(selectedSprite.y)}
            </p>
          ) : (
            <p className="text-sm text-gray-500">No sprite selected</p>
          )}
        </div>
        {selectedSprite && (
          <button
            onClick={() => resetSpritePosition(selectedSprite.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Reset Position
          </button>
        )}
      </div>

      {/* Preview Area */}
      <div ref={previewRef} className="flex-1 relative overflow-hidden">
        {sprites.map((sprite) => (
          <div
            key={sprite.id}
            onMouseDown={(e) => handleDrag(e, sprite)}
            onClick={() => onSelectSprite(sprite.id)}
            className="absolute transition-all duration-150 cursor-move"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(${sprite.x}px, ${sprite.y}px) rotate(${sprite.rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            {sprite.bubble?.type === "say" && (
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                <div className="bg-pink-500 text-white text-sm px-4 py-2 rounded-lg">
                  {sprite.bubble.text}
                </div>
              </div>
            )}
            {sprite.bubble?.type === "think" && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                <div className="bg-gray-500 text-white text-sm px-4 py-2 rounded-full">
                  {sprite.bubble.text}
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 opacity-70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 opacity-50" />
                  <div className="w-1 h-1 rounded-full bg-gray-500 opacity-30" />
                </div>
              </div>
            )}
            {selectedSpriteId === sprite.id ? (
              <div
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "rgba(229, 231, 235, 0.5)",
                  padding: "0.1rem",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                }}
              >
                {sprite.type === "cat" ? <CatSprite /> : <BallSprite />}
              </div>
            ) : sprite.type === "cat" ? (
              <CatSprite />
            ) : (
              <BallSprite />
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="absolute bottom-10 right-10 flex gap-2">
          <Button onClick={() => setDrawerOpen(true)}>
            Open Action Drawer
          </Button>
          <Button type="primary" onClick={playActions}>
            ▶ Play
          </Button>
        </div>
      </div>

      {/* Drawer */}
      <ActionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default PreviewArea;
