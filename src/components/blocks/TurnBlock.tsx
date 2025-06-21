import React from "react";
import Icon from "../Icon";
import BlockWrapper from "./BlockWrapper";

interface TurnBlockProps {
  label: string;
  degrees: number;
  iconName: string;
  onChange: (value: number) => void;
  onClick: () => void;
}

const TurnBlock: React.FC<TurnBlockProps> = ({
  label,
  degrees,
  iconName,
  onChange,
  onClick,
}) => (
  <BlockWrapper color="bg-blue-500">
    <span className="flex" onClick={onClick}>
      {label}
      <Icon name={iconName} size={15} className="text-white mx-2" />
      <input
        type="number"
        min={0}
        max={360}
        value={degrees}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-14 mx-2 text-black text-center rounded-sm"
      />
      degrees
    </span>
  </BlockWrapper>
);

export default TurnBlock;
