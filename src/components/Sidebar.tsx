import React, { useState } from "react";
import Icon from "./Icon";
import MoveBlock from "./blocks/MoveBlock";
import TurnBlock from "./blocks/TurnBlock";
import GoToBlock from "./blocks/GoToBlock";
import RepeatBlock from "./blocks/RepeatBlock";
import { useSprites } from "../contexts/SpriteContext";
import { useActionContext } from "../contexts/ActionContext";
import { executeAction } from "../utils/executeAction";
import SayThinkBlock from "./blocks/SayThinkBlock";

const Sidebar: React.FC = () => {
  const [selectedType, setSelectedType] = useState<"cat" | "ball">("cat");
  const [moveSteps, setMoveSteps] = useState(10);
  const [turnDeg, setTurnDeg] = useState(15);
  const [goToX, setGoToX] = useState(0);
  const [goToY, setGoToY] = useState(0);
  const [repeatCount, setRepeatCount] = useState(3);
  const [repeatValue, setRepeatValue] = useState(10);
  const [repeatType, setRepeatType] = useState<"move" | "turn">("move");
  const [sayMessage, setSayMessage] = useState("Hello!");
  const [thinkMessage, setThinkMessage] = useState("Hmm...");
  const [bubbleDuration, setBubbleDuration] = useState(2);

  const { sprites, addSprite, selectedSpriteId, updateSprite } = useSprites();
  const { addAction } = useActionContext();

  const selectedSprite = sprites.find((s) => s.id === selectedSpriteId);
  if (!selectedSpriteId || !selectedSprite) return null;

  const handleMove = () => {
    const update = executeAction(selectedSprite, {
      type: "move",
      value: moveSteps,
    });
    updateSprite(selectedSpriteId, {
      x: update.x ?? selectedSprite.x,
      y: update.y ?? selectedSprite.y,
      rotation: update.rotation ?? selectedSprite.rotation,
    });
    addAction(selectedSpriteId, { type: "move", value: moveSteps });
  };

  const handleTurn = (dir: "left" | "right") => {
    const value = dir === "left" ? -turnDeg : turnDeg;
    const update = executeAction(selectedSprite, { type: "turn", value });
    updateSprite(selectedSpriteId, {
      rotation: update.rotation ?? selectedSprite.rotation,
    });
    addAction(selectedSpriteId, { type: "turn", value });
  };

  const handleGoTo = () => {
    updateSprite(selectedSpriteId, { x: goToX, y: goToY });
    addAction(selectedSpriteId, { type: "goTo", x: goToX, y: goToY });
  };

  const handleRepeat = () => {
    if (!selectedSpriteId) return;
    const sprite = sprites.find((s) => s.id === selectedSpriteId);
    if (!sprite) return;

    let updatedSprite = { ...sprite };

    for (let i = 0; i < repeatCount; i++) {
      const action = { type: repeatType, value: repeatValue } as const;

      // Execute action on current state
      const update = executeAction(updatedSprite, action);

      // Update state for next iteration
      updatedSprite = {
        ...updatedSprite,
        x: update.x ?? updatedSprite.x,
        y: update.y ?? updatedSprite.y,
        rotation: update.rotation ?? updatedSprite.rotation,
      };

      // Apply to global state
      updateSprite(selectedSpriteId, {
        x: updatedSprite.x,
        y: updatedSprite.y,
        rotation: updatedSprite.rotation,
      });

      // Optional: add to queue (if you want playback later)
      addAction(selectedSpriteId, action);
    }
  };

  const handleSay = () => {
    if (!selectedSpriteId) return;
    const sprite = sprites.find((s) => s.id === selectedSpriteId);
    if (!sprite) return;

    updateSprite(selectedSpriteId, {
      bubble: {
        type: "say",
        text: sayMessage,
      },
    });

    addAction(selectedSpriteId, {
      type: "say",
      value: sayMessage,
      duration: bubbleDuration,
    });

    // Optional: auto-clear bubble
    setTimeout(() => {
      updateSprite(selectedSpriteId, { bubble: null });
    }, bubbleDuration * 1000);
  };

  const handleThink = () => {
    if (!selectedSpriteId) return;
    const sprite = sprites.find((s) => s.id === selectedSpriteId);
    if (!sprite) return;

    updateSprite(selectedSpriteId, {
      bubble: {
        type: "think",
        text: thinkMessage,
      },
    });

    addAction(selectedSpriteId, {
      type: "think",
      value: thinkMessage,
      duration: bubbleDuration,
    });

    setTimeout(() => {
      updateSprite(selectedSpriteId, { bubble: null });
    }, bubbleDuration * 1000);
  };

  return (
    <div className="w-80 h-full pt-2 pb-8 px-2 flex flex-col border-r border-gray-200 overflow-y-auto">
      <div className="font-bold">Events</div>
      <div className="bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        When <Icon name="flag" size={15} className="text-green-600 mx-2" />{" "}
        clicked
      </div>
      <div className="bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        When this sprite clicked
      </div>

      <div className="font-bold mt-4">Motion</div>

      <MoveBlock
        steps={moveSteps}
        onChange={setMoveSteps}
        onClick={handleMove}
      />

      <TurnBlock
        label="Turn Left"
        iconName="undo"
        degrees={turnDeg}
        onChange={setTurnDeg}
        onClick={() => handleTurn("left")}
      />
      <TurnBlock
        label="Turn Right"
        iconName="redo"
        degrees={turnDeg}
        onChange={setTurnDeg}
        onClick={() => handleTurn("right")}
      />

      <GoToBlock
        x={goToX}
        y={goToY}
        onChangeX={setGoToX}
        onChangeY={setGoToY}
        onClick={handleGoTo}
      />

      <div className="font-bold mt-4">Control</div>
      <RepeatBlock
        count={repeatCount}
        value={repeatValue}
        type={repeatType}
        onChangeCount={setRepeatCount}
        onChangeType={setRepeatType}
        onChangeValue={setRepeatValue}
        onRun={handleRepeat}
      />

      <div className="font-bold mt-4">Looks</div>

      <SayThinkBlock
        type="say"
        message={sayMessage}
        seconds={bubbleDuration}
        onMessageChange={setSayMessage}
        onSecondsChange={setBubbleDuration}
        onRun={handleSay}
      />

      <SayThinkBlock
        type="think"
        message={thinkMessage}
        seconds={bubbleDuration}
        onMessageChange={setThinkMessage}
        onSecondsChange={setBubbleDuration}
        onRun={handleThink}
      />

      {/* Sprite Adding */}
      <div className="mt-6 p-2">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as "cat" | "ball")}
          className="border rounded px-2 py-1 text-sm mr-2"
        >
          <option value="cat">Cat Sprite</option>
          <option value="ball">Ball Sprite</option>
        </select>
        <button
          onClick={() => addSprite(selectedType)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded shadow"
        >
          + Add Sprite
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
