import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, className = "" }) => {
  return (
    <svg
      className={`fill-current ${className}`}
      width={`${size}px`}
      height={`${size}px`}
    >
      <use xlinkHref={`/icons/solid.svg#${name}`} />
    </svg>
  );
};

export default Icon;
