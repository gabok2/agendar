import {
  IClass,
  IStatusClass,
  IStatusShift,
} from "@/app/(dashboard)/classes/interfaces/class";
import { IClassRepository } from "../../(dashboard)/classes/interfaces/classRepository";

export interface ClassService {
  getClasses(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ classes: IClass[] | null; count: number | null }>;
  deleteClass(id: string): Promise<void>;
  getStatusClass(): Promise<IStatusClass[]>;
  getStatusShift(): Promise<IStatusShift[]>;
}

export function createClassService(
  classRepository: IClassRepository
): ClassService {
  async function getClasses(
    page: number,
    pageSize: number,
    searchTerm: string
  ) {
    return classRepository.fetchClass(page, pageSize, searchTerm);
  }

  async function deleteClass(id: string) {
    return classRepository.deleteClass(id);
  }

  async function getStatusClass() {
    return classRepository.fetchStatusClass();
  }

  async function getStatusShift() {
    return classRepository.fetchStatusShift();
  }

  return {
    getClasses,
    deleteClass,
    getStatusClass,
    getStatusShift,
  };
}
