import React, { useState } from "react";
import Icon from "./Icon";
import MoveBlock from "./blocks/MoveBlock";
import TurnBlock from "./blocks/TurnBlock";
import GoToBlock from "./blocks/GoToBlock";
import RepeatBlock from "./blocks/RepeatBlock";

interface SidebarProps {
  onMove: (steps: number) => void;
  onTurn: (degrees: number) => void;
  onTurnAnti: (degrees: number) => void;
  onGoTo: (x: number, y: number) => void;
  onRepeat: (count: number) => void;
  onRepeatAction: (type: "move" | "turn", value: number, count: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onMove,
  onTurn,
  onTurnAnti,
  onGoTo,
  onRepeatAction,
}) => {
  const [stepCount, setStepCount] = useState(10);
  const [clockwiseDegrees, setClockwiseDegrees] = useState(15);
  const [anticlockwiseDegrees, setAnticlockwiseDegrees] = useState(15);
  const [gotoX, setGotoX] = useState(0);
  const [gotoY, setGotoY] = useState(0);
  const [repeatCount, setRepeatCount] = useState(5);
  const [repeatType, setRepeatType] = useState<"move" | "turn">("move");
  const [repeatValue, setRepeatValue] = useState(10);

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">Events</div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>

      <div className="font-bold mt-4">Motion</div>

      <MoveBlock
        steps={stepCount}
        onChange={setStepCount}
        onClick={() => onMove(stepCount)}
      />
      <TurnBlock
        label="Turn"
        degrees={anticlockwiseDegrees}
        iconName="undo"
        onChange={setAnticlockwiseDegrees}
        onClick={() => onTurnAnti(anticlockwiseDegrees)}
      />
      <TurnBlock
        label="Turn"
        degrees={clockwiseDegrees}
        iconName="redo"
        onChange={setClockwiseDegrees}
        onClick={() => onTurn(clockwiseDegrees)}
      />
      <GoToBlock
        x={gotoX}
        y={gotoY}
        onChangeX={setGotoX}
        onChangeY={setGotoY}
        onClick={() => onGoTo(gotoX, gotoY)}
      />

      <div className="font-bold mt-4">Control</div>
      <RepeatBlock
        count={repeatCount}
        value={repeatValue}
        type={repeatType}
        onChangeCount={setRepeatCount}
        onChangeType={setRepeatType}
        onChangeValue={setRepeatValue}
        onRun={() => onRepeatAction(repeatType, repeatValue, repeatCount)}
      />
    </div>
  );
};

export default Sidebar;
