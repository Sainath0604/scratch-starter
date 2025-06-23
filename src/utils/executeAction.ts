import { SpriteState } from "../types/sprite";
import { ActionType } from "../types/actions";

export const executeAction = (
  sprite: SpriteState,
  action: ActionType
): Partial<SpriteState> => {
  switch (action.type) {
    case "move":
      const radians = (sprite.rotation * Math.PI) / 180;
      return {
        x: sprite.x + Math.cos(radians) * action.value,
        y: sprite.y + Math.sin(radians) * action.value,
      };
    case "turn":
      return {
        rotation: sprite.rotation + action.value,
      };
    case "say":
      return {
        bubble: { type: "say", text: action.value },
      };
    default:
      return {};
  }
};
