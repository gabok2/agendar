import { create } from "zustand";
import { Student } from "../utils/types/student";
import { Teacher } from "../utils/types/teacher";
import { Class } from "../utils/types/class";

interface Store {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  objectStructure: Student | Teacher | Class | null;
  setObjectStructure: (object: Student | Teacher | Class | null) => void;
}

export const useStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  objectStructure: null,
  setObjectStructure: (object) => set({ objectStructure: object }),
}));
