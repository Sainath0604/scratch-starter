import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "tailwindcss/tailwind.css";
import { SpriteProvider } from "./contexts/SpriteContext";
import { ActionProvider } from "./contexts/ActionContext";

const root = createRoot(document.getElementById("root")!);
root.render(
  <SpriteProvider>
    <ActionProvider>
      <App />
    </ActionProvider>
  </SpriteProvider>
);
