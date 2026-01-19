import { createContext, useContext } from "react";

export const LarderContext = createContext(undefined);

export const useLarderContext = () => {
  const context = useContext(LarderContext);

  if (context === undefined) {
    throw new Error("Must be called within LarderFooditemsContextProvider");
  }

  return context;
};