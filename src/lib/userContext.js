import { createContext } from "react";

const userContext = createContext();

export function useUser() {
  return useContext(userContext);
}
