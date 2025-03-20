"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type OutlineState = {
  axis: "vertical" | "horizontal";
  width: "small" | "medium" | "large";
  height: "small" | "medium" | "large" | "full";
  enableAutoTracking: boolean;
};

const OutlineContext = createContext<{
  state: OutlineState;
  setState: React.Dispatch<React.SetStateAction<OutlineState>>;
} | undefined>(undefined);

export const OutlineContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<OutlineState>({
    axis: "vertical",
    width: "medium",
    height: "medium",
    enableAutoTracking: true,
  });

  return (
    <OutlineContext.Provider value={{ state, setState }}>
      {children}
    </OutlineContext.Provider>
  );
};

export const useOutlineContext = () => {
  const context = useContext(OutlineContext);
  if (!context) {
    throw new Error("useOutlineContext must be used within an OutlineContextProvider");
  }
  return context;
};
