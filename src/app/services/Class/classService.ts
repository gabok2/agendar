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
  updateClass(
    id: string,
    updates: {
      statusShift: number;
      name: string;
      status: number;
      headTeacherName: string;
      assistantName: string;
      headTeacherId: number;
      assistantId: number;
      studentsIds: string[];
    }
  ): Promise<void>;
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

  async function updateClass(
    id: string,
    updates: {
      statusShift: number;
      name: string;
      status: number;
      headTeacherName: string;
      assistantName: string;
      headTeacherId: number;
      assistantId: number;
    }
  ) {
    return classRepository.updateClass(id, updates);
  }

  return {
    getClasses,
    deleteClass,
    getStatusClass,
    getStatusShift,
    updateClass,
  };
}
