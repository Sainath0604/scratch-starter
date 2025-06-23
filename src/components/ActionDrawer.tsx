import React, { useState } from "react";
import { Drawer, Select, Button } from "antd";
import { useSprites } from "../contexts/SpriteContext";
import { useActionContext } from "../contexts/ActionContext";
import MoveBlock from "./blocks/MoveBlock";
import TurnBlock from "./blocks/TurnBlock";
import { ActionType } from "../types/actions";
import GoToBlock from "./blocks/GoToBlock";
import SayThinkBlock from "./blocks/SayThinkBlock";

interface ActionDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ActionDrawer: React.FC<ActionDrawerProps> = ({ open, onClose }) => {
  const { sprites, selectedSpriteId, setSelectedSpriteId, updateSprite } =
    useSprites();
  const { addAction, getActionsForSprite, clearActions } = useActionContext();
  const [moveSteps, setMoveSteps] = useState(10);
  const [turnDeg, setTurnDeg] = useState(15);
  const [goToX, setGoToX] = useState(0);
  const [goToY, setGoToY] = useState(0);
  const [sayMessage, setSayMessage] = useState("Hello!");
  const [thinkMessage, setThinkMessage] = useState("Hmm...");
  const [bubbleDuration, setBubbleDuration] = useState(2);

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

  return (
    <Drawer
      title="Assign Actions"
      placement="right"
      width={400}
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

      {/* Action Blocks */}
      <div className="space-y-2">
        <MoveBlock
          steps={moveSteps}
          onChange={setMoveSteps}
          onClick={() => handleAddAction({ type: "move", value: moveSteps })}
        />

        <TurnBlock
          label="Turn Left"
          iconName="undo"
          degrees={turnDeg}
          onChange={setTurnDeg}
          onClick={() => handleAddAction({ type: "turn", value: -turnDeg })}
        />

        <TurnBlock
          label="Turn Right"
          iconName="redo"
          degrees={turnDeg}
          onChange={setTurnDeg}
          onClick={() => handleAddAction({ type: "turn", value: turnDeg })}
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
        />

        <SayThinkBlock
          type="think"
          message={thinkMessage}
          seconds={bubbleDuration}
          onMessageChange={setThinkMessage}
          onSecondsChange={setBubbleDuration}
          onRun={handleThink}
        />
      </div>

      {/* Current Action Stack */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Action Stack:</h4>
        <ul className="list-disc list-inside text-sm">
          {actions.map((a, i) => {
            switch (a.type) {
              case "move":
                return <li key={i}>Move {a.value} steps</li>;
              case "turn":
                return <li key={i}>Turn {a.value}°</li>;
              case "goTo":
                return (
                  <li key={i}>
                    Go to ({a.x}, {a.y})
                  </li>
                );
              case "say":
                return <li key={i}>Say "{a.value}"</li>;
              case "think":
                return <li key={i}>Think "{a.value}"</li>;
              case "repeat":
                return (
                  <li key={i}>
                    Repeat {a.count} × [{a.action.type}]
                  </li>
                );
              default:
                return null;
            }
          })}
        </ul>

        <Button
          danger
          size="small"
          onClick={() => clearActions(selectedSpriteId || "")}
          className="mt-2"
        >
          Clear Actions
        </Button>
      </div>
    </Drawer>
  );
};

export default ActionDrawer;
