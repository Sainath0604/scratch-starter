import React, { useState } from "react";
import Icon from "./Icon";

interface SidebarProps {
  onMove: (steps: number) => void;
  onTurn: (degrees: number) => void;
  onTurnAnti: (degrees: number) => void;
  onGoTo: (x: number, y: number) => void;
  onRepeat: (count: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onMove,
  onTurn,
  onTurnAnti,
  onGoTo,
  onRepeat,
}) => {
  const [stepCount, setStepCount] = useState(10);
  const [clockwiseDegrees, setClockwiseDegrees] = useState(15);
  const [anticlockwiseDegrees, setAnticlockwiseDegrees] = useState(15);
  const [gotoX, setGotoX] = useState(0);
  const [gotoY, setGotoY] = useState(0);
  const [repeatCount, setRepeatCount] = useState(5);

  const handleRepeat = () => onRepeat(repeatCount);
  const handleMove = () => onMove(stepCount);
  const handleTurnClockwise = () => onTurn(clockwiseDegrees);
  const handleTurnAntiClockwise = () => onTurnAnti(anticlockwiseDegrees);
  const handleGoTo = () => onGoTo(gotoX, gotoY);

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">{"Events"}</div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>

      <div className="font-bold mt-4">{"Motion"}</div>

      {/* Move */}
      <div
        className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleMove}
      >
        {"Move "}
        <input
          type="number"
          min={0}
          max={20}
          value={stepCount}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setStepCount(Number(e.target.value))}
          className="w-12 mx-2 text-black text-center rounded-sm"
        />
        {"steps"}
      </div>

      {/* Turn anti-clockwise */}
      <div
        className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleTurnAntiClockwise}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input
          type="number"
          min={0}
          max={360}
          value={anticlockwiseDegrees}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setAnticlockwiseDegrees(Number(e.target.value))}
          className="w-14 mx-2 text-black text-center rounded-sm"
        />
        {"degrees"}
      </div>

      {/* Turn clockwise */}
      <div
        className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleTurnClockwise}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        <input
          type="number"
          min={0}
          max={360}
          value={clockwiseDegrees}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setClockwiseDegrees(Number(e.target.value))}
          className="w-14 mx-2 text-black text-center rounded-sm"
        />
        {"degrees"}
      </div>

      <div className="font-bold mt-4">{"Positioning"}</div>
      <div
        className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleGoTo}
      >
        {"Go to x:"}
        <input
          type="number"
          value={gotoX}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setGotoX(Number(e.target.value))}
          className="w-14 mx-2 text-black text-center rounded-sm"
        />
        {"y:"}
        <input
          type="number"
          value={gotoY}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setGotoY(Number(e.target.value))}
          className="w-14 mx-2 text-black text-center rounded-sm"
        />
      </div>
      <div className="font-bold mt-4">{"Control"}</div>
      <div
        className="flex flex-row flex-wrap items-center bg-orange-500 text-white px-2 py-1 my-2 text-sm rounded cursor-pointer 
        hover:bg-orange-600 transition-all"
        onClick={handleRepeat}
      >
        <span className="ml-1">Repeat</span>
        <input
          type="number"
          min={1}
          max={50}
          value={repeatCount}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setRepeatCount(Number(e.target.value))}
          className="w-14 mx-2 text-black text-center rounded-sm"
        />
        <span>times</span>
      </div>
    </div>
  );
};

export default Sidebar;
