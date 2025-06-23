import React, { createContext, useContext, useState } from "react";
import { ActionType } from "../types/actions";

type ActionMap = {
  [spriteId: string]: ActionType[];
};

interface ActionContextType {
  actions: ActionMap;
  addAction: (spriteId: string, action: ActionType) => void;
  clearActions: (spriteId: string) => void;
  setActions: (spriteId: string, actions: ActionType[]) => void;
  getActionsForSprite: (spriteId: string | null) => ActionType[];
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actions, setActionsState] = useState<ActionMap>({});

  const addAction = (spriteId: string, action: ActionType) => {
    setActionsState((prev) => ({
      ...prev,
      [spriteId]: [...(prev[spriteId] || []), action],
    }));
  };

  const setActions = (spriteId: string, newActions: ActionType[]) => {
    setActionsState((prev) => ({
      ...prev,
      [spriteId]: newActions,
    }));
  };

  const clearActions = (spriteId: string) => {
    setActionsState((prev) => ({
      ...prev,
      [spriteId]: [],
    }));
  };

  const getActionsForSprite = (spriteId: string | null): ActionType[] => {
    if (!spriteId) return [];
    return actions[spriteId] || [];
  };

  return (
    <ActionContext.Provider
      value={{
        actions,
        addAction,
        clearActions,
        setActions,
        getActionsForSprite,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => {
  const ctx = useContext(ActionContext);
  if (!ctx)
    throw new Error("useActionContext must be used inside ActionProvider");
  return ctx;
};
