export interface SpriteState {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  bubble: null | {
    type: "say" | "think";
    text: string;
  };
  animationQueue: AnimationType[];
  type?: "cat" | "ball";
}

export type AnimationType =
  | { type: "move"; value: number }
  | { type: "turn"; value: number }
  | { type: "goTo"; x: number; y: number }
  | { type: "repeat"; count: number; action: AnimationType }
  | { type: "say"; value: string; duration: number }
  | { type: "think"; value: string; duration: number };
