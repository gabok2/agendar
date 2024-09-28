import { create } from "zustand";

interface Store {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  objectStructure: { [key: string]: string };
  setObjetcStructure: (object: { [key: string]: string }) => void;
}

export const useStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  objectStructure: {},
  setObjetcStructure: (object) => set({ objectStructure: object }),
}));
