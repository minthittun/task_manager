import { createContext, useContext } from "react";
import TaskStore from "./TaskStore";


export const store = {
  taskStore: new TaskStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
