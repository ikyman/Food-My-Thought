import { createContext, useContext } from "react";

export const QueryDjangoBackendContext = createContext(undefined);

export const useQueryDjangoBackendContext = () => {
  const context = useContext(QueryDjangoBackendContext);

  if (context === undefined) {
    throw new Error("Must be called within QueryDjangoBackendContextProvider");
  }

  return context;
};