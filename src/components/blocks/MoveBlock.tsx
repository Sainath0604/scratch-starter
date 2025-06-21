import React from "react";
import BlockWrapper from "./BlockWrapper";

interface MoveBlockProps {
  steps: number;
  onChange: (value: number) => void;
  onClick: () => void;
}

const MoveBlock: React.FC<MoveBlockProps> = ({ steps, onChange, onClick }) => (
  <BlockWrapper color="bg-blue-500">
    <span onClick={onClick}>
      Move
      <input
        type="number"
        min={0}
        max={20}
        value={steps}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-12 mx-2 text-black text-center rounded-sm"
      />
      steps
    </span>
  </BlockWrapper>
);

export default MoveBlock;
