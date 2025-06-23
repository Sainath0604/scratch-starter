import { AnimationType } from "./sprite";

export type ActionType =
  | { type: "move"; value: number }
  | { type: "turn"; value: number }
  | { type: "goTo"; x: number; y: number }
  | { type: "say"; value: string; duration: number }
  | { type: "think"; value: string; duration: number }
  | { type: "repeat"; count: number; action: AnimationType };

export type MoveAction = { type: "move"; value: number };
export type TurnAction = { type: "turn"; value: number };

export interface RepeatAction {
  type: "repeat";
  count: number;
  action: MoveAction | TurnAction;
}
