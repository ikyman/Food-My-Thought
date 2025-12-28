import { createContext, useContext } from "react";

export const LarderFooditemsContext = createContext(undefined);

export const useLarderFooditemsContext = () => {
  const context = useContext(LarderFooditemsContext);

  if (context === undefined) {
    throw new Error("Must be called within LarderFooditemsContextProvider");
  }

  return context;
};