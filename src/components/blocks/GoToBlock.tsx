import React from "react";
import BlockWrapper from "./BlockWrapper";

interface GoToBlockProps {
  x: number;
  y: number;
  onChangeX: (x: number) => void;
  onChangeY: (y: number) => void;
  onClick: () => void;
}

const GoToBlock: React.FC<GoToBlockProps> = ({
  x,
  y,
  onChangeX,
  onChangeY,
  onClick,
}) => (
  <BlockWrapper color="bg-blue-500">
    <span className="flex" onClick={onClick}>
      Go to x:
      <input
        type="number"
        value={x}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChangeX(Number(e.target.value))}
        className="w-10 mx-2 text-black text-center rounded-sm"
      />
      y:
      <input
        type="number"
        value={y}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChangeY(Number(e.target.value))}
        className="w-10 mx-2 text-black text-center rounded-sm"
      />
    </span>
  </BlockWrapper>
);

export default GoToBlock;
