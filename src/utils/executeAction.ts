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
    case "goTo":
      return { ...sprite, x: action.x, y: action.y };
    case "say":
      return {
        bubble: { type: "say", text: action.value },
      };
    case "think":
      return {
        bubble: { type: "think", text: action.value },
      };
    // case "repeat":
    //   let current: Partial<SpriteState> = { ...sprite };
    //   for (let i = 0; i < action.count; i++) {
    //     const result = executeAction(current as SpriteState, action.action);
    //     current = { ...current, ...result };
    //   }
    //   return current;
    case "repeat":
      let current = { ...sprite };
      for (let i = 0; i < action.count; i++) {
        const result = executeAction(current, action.action);
        current = { ...current, ...result };
      }
      return current;

    default:
      return {};
  }
};
