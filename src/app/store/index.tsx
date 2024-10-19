import { create } from "zustand";
import { Student } from "../utils/types/student";
import { Teacher } from "../utils/types/teacher";
import { Class } from "../utils/types/class";

interface Store {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  objectStructure: Student | Teacher | Class | null;
  setObjectStructure: (object: Student | Teacher | Class | null) => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  baseUrl: URLSearchParams;
  setBaseUrl: (baseUrl: URLSearchParams) => void;
  count: number | null;
  setCount: (count: number | null) => void;
}

export const useStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  objectStructure: null,
  setObjectStructure: (object) => set({ objectStructure: object }),
  page: 1,
  setPage: (page) => set({ page }),
  pageSize: 10,
  setPageSize: (pageSize) => set({ pageSize }),
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  baseUrl: new URLSearchParams(),
  setBaseUrl: (baseUrl) => set({ baseUrl }),
  count: null,
  setCount: (count) => set({ count }),
}));
