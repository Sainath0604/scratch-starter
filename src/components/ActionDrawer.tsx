import React, { useState } from "react";
import { Drawer, Select, Button } from "antd";
import { useSprites } from "../contexts/SpriteContext";
import { useActionContext } from "../contexts/ActionContext";
import MoveBlock from "./blocks/MoveBlock";
import TurnBlock from "./blocks/TurnBlock";
import { ActionType } from "../types/actions";
import GoToBlock from "./blocks/GoToBlock";
import SayThinkBlock from "./blocks/SayThinkBlock";
import RepeatBlock from "./blocks/RepeatBlock";
import { executeAction } from "../utils/executeAction";

interface ActionDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ActionDrawer: React.FC<ActionDrawerProps> = ({ open, onClose }) => {
  const { sprites, selectedSpriteId, setSelectedSpriteId, updateSprite } =
    useSprites();
  const { addAction, getActionsForSprite, clearActions } = useActionContext();
  const [moveSteps, setMoveSteps] = useState(10);
  const [turnDegLeft, setTurnDegLeft] = useState(15);
  const [turnDegRight, setTurnDegRight] = useState(15);
  const [goToX, setGoToX] = useState(0);
  const [goToY, setGoToY] = useState(0);
  const [sayMessage, setSayMessage] = useState("Hello!");
  const [thinkMessage, setThinkMessage] = useState("Hmm...");
  const [bubbleDuration, setBubbleDuration] = useState(2);
  const [repeatCount, setRepeatCount] = useState(3);
  const [repeatValue, setRepeatValue] = useState(10);
  const [repeatType, setRepeatType] = useState<"move" | "turn">("move");

  const actions = getActionsForSprite(selectedSpriteId);

  const handleAddAction = (action: ActionType) => {
    if (!selectedSpriteId) return;
    addAction(selectedSpriteId, action);
  };

  const handleGoTo = () => {
    if (!selectedSpriteId) return;
    addAction(selectedSpriteId, { type: "goTo", x: goToX, y: goToY });
  };

  const handleSay = () => {
    if (!selectedSpriteId) return;
    addAction(selectedSpriteId, {
      type: "say",
      value: sayMessage,
      duration: bubbleDuration,
    });
  };

  const handleThink = () => {
    if (!selectedSpriteId) return;
    addAction(selectedSpriteId, {
      type: "think",
      value: thinkMessage,
      duration: bubbleDuration,
    });
  };

  const handleAddRepeat = () => {
    if (!selectedSpriteId) return;

    const repeatInner = { type: repeatType, value: repeatValue } as
      | { type: "move"; value: number }
      | { type: "turn"; value: number };

    const repeatAction = {
      type: "repeat",
      count: repeatCount,
      action: repeatInner,
    } as ActionType;

    addAction(selectedSpriteId, repeatAction);

    // 🆕 Store repeat info in sprite for collision-based swap
    updateSprite(selectedSpriteId, {
      currentRepeat: repeatInner,
    });
  };

  return (
    <Drawer
      title="Assign Actions"
      placement="right"
      width={900}
      onClose={onClose}
      open={open}
    >
      {/* Sprite Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Sprite</label>
        <Select
          value={selectedSpriteId}
          onChange={(id: string) => setSelectedSpriteId(id)}
          style={{ width: "100%" }}
        >
          {sprites.map((sprite) => (
            <Select.Option key={sprite.id} value={sprite.id}>
              {sprite.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Two-column layout: Action Blocks & Action Stack */}
      <div className="flex gap-4 h-[600px]">
        {/* Left Column: Action Blocks */}
        <div className="w-1/2 space-y-4 overflow-auto">
          <MoveBlock
            steps={moveSteps}
            onChange={setMoveSteps}
            onClick={() => handleAddAction({ type: "move", value: moveSteps })}
          />

          <TurnBlock
            label="Turn Left"
            iconName="undo"
            degrees={turnDegLeft}
            onChange={setTurnDegLeft}
            onClick={() =>
              handleAddAction({ type: "turn", value: -turnDegLeft })
            }
          />

          <TurnBlock
            label="Turn Right"
            iconName="redo"
            degrees={turnDegRight}
            onChange={setTurnDegRight}
            onClick={() =>
              handleAddAction({ type: "turn", value: turnDegRight })
            }
          />

          <GoToBlock
            x={goToX}
            y={goToY}
            onChangeX={setGoToX}
            onChangeY={setGoToY}
            onClick={handleGoTo}
          />

          <SayThinkBlock
            type="say"
            message={sayMessage}
            seconds={bubbleDuration}
            onMessageChange={setSayMessage}
            onSecondsChange={setBubbleDuration}
            onRun={handleSay}
            sumbmitBtnComponent={"action-drawer"}
          />

          <SayThinkBlock
            type="think"
            message={thinkMessage}
            seconds={bubbleDuration}
            onMessageChange={setThinkMessage}
            onSecondsChange={setBubbleDuration}
            onRun={handleThink}
            sumbmitBtnComponent={"action-drawer"}
          />

          <RepeatBlock
            count={repeatCount}
            value={repeatValue}
            type={repeatType}
            onChangeCount={setRepeatCount}
            onChangeValue={setRepeatValue}
            onChangeType={setRepeatType}
            onRun={handleAddRepeat}
            sumbmitBtnComponent={"action-drawer"}
          />
        </div>

        {/* Right Column: Action Stack */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Action Stack:</h4>
            <Button
              danger
              size="small"
              onClick={() => clearActions(selectedSpriteId || "")}
            >
              Clear All
            </Button>
          </div>

          <div
            className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50"
            style={{ maxHeight: "500px" }}
          >
            <ul className="space-y-2 text-sm">
              {actions.map((a, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>
                    {a.type === "move" && `Move ${a.value} steps`}
                    {a.type === "turn" &&
                      `Turn ${a.value < 0 ? "Left" : "Right"} ${Math.abs(
                        a.value
                      )}°`}
                    {a.type === "goTo" && `Go to (x :${a.x}, y :${a.y})`}
                    {a.type === "say" && `Say "${a.value}"`}
                    {a.type === "think" && `Think "${a.value}"`}
                    {a.type === "repeat" &&
                      (() => {
                        const inner = a.action;
                        if (inner.type === "move" || inner.type === "turn") {
                          return `Repeat ${a.count} × ${inner.value} ${
                            inner.type === "move" ? "steps" : "degrees"
                          }`;
                        }
                        return `Repeat ${a.count} × [${inner.type}]`;
                      })()}
                  </span>
                  <Button
                    danger
                    size="small"
                    type="text"
                    onClick={() => {
                      if (!selectedSpriteId) return;
                      const newActions = [...actions];
                      newActions.splice(i, 1);
                      clearActions(selectedSpriteId);
                      newActions.forEach((act) =>
                        addAction(selectedSpriteId, act)
                      );
                    }}
                  >
                    ❌
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ActionDrawer;
