export interface Position {
  x: number;
  y: number;
}

export type BlockType = "move" | "turn" | "repeat";

export interface Block {
  id: string;
  type: BlockType;
  args: any;
  children?: Block[]; // For nested support (repeat, etc.)
}
