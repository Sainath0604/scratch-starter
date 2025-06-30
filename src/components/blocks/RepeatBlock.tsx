import React from "react";

type RepeatActionType = "move" | "turn";

interface RepeatBlockProps {
  count: number;
  value: number;
  type: RepeatActionType;
  onChangeCount: (v: number) => void;
  onChangeValue: (v: number) => void;
  onChangeType: (t: RepeatActionType) => void;
  onRun: () => void;
  sumbmitBtnComponent?: "sidebar" | "action-drawer";
}

const RepeatBlock: React.FC<RepeatBlockProps> = ({
  count,
  value,
  type,
  onChangeCount,
  onChangeValue,
  onChangeType,
  onRun,
  sumbmitBtnComponent = "sidebar",
}) => (
  <div className="bg-yellow-500 text-white p-2 my-2 text-sm rounded cursor-pointer">
    <div className="flex items-center mb-2">
      Repeat
      <input
        type="number"
        min={1}
        max={50}
        value={count}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChangeCount(Number(e.target.value))}
        className="w-14 mx-2 text-black text-center rounded-sm"
      />
      times
    </div>
    <div className="flex items-center mb-2">
      <select
        value={type}
        onChange={(e) => onChangeType(e.target.value as "move" | "turn")}
        className="text-black rounded px-1"
      >
        <option value="move">Move</option>
        <option value="turn">Turn</option>
      </select>
      <input
        type="number"
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChangeValue(Number(e.target.value))}
        className="w-16 ml-2 text-black text-center rounded-sm"
      />
      {type === "move" ? "steps" : "degrees"}
    </div>
    <button
      onClick={onRun}
      className="mt-1 px-2 py-1 bg-yellow-700 hover:bg-yellow-800 rounded text-white text-xs"
    >
      {sumbmitBtnComponent === "sidebar" ? "Run" : "Add"}
    </button>
  </div>
);

export default RepeatBlock;
