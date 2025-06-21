import React from "react";

const BlockWrapper: React.FC<{ children: React.ReactNode; color: string }> = ({
  children,
  color,
}) => (
  <div
    className={`flex flex-row items-center ${color} text-white px-2 py-1 my-2 text-sm cursor-pointer rounded`}
  >
    {children}
  </div>
);

export default BlockWrapper;
