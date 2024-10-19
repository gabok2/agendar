import { ITeacherRepository } from "../interfaces/TeacherRepository";
import { ITeacher, UpdateableTeacherFields } from "../interfaces/Teacher";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";

export interface TeacherService {
  getTeachers(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ teachers: ITeacher[] | null; count: number | null }>;
  getTeachersStatus(): Promise<StatusEnumTeacherProps[]>;
  deleteTeacher(id: string): Promise<void>;
  updateTeacher(
    id: number,
    updatedData: UpdateableTeacherFields
  ): Promise<void>;
}

export function createTeacherService(
  teacherRepository: ITeacherRepository
): TeacherService {
  async function getTeachers(
    page: number,
    pageSize: number,
    searchTerm: string
  ) {
    return teacherRepository.fetchTeachers(page, pageSize, searchTerm);
  }

  async function getTeachersStatus() {
    return teacherRepository.fetchTeachersStatus();
  }

  async function deleteTeacher(id: string) {
    await teacherRepository.deleteTeacher(id);
  }

  async function updateTeacher(
    id: number,
    updatedData: UpdateableTeacherFields
  ) {
    await teacherRepository.updateTeacher(id, updatedData);
  }

  return {
    getTeachers,
    getTeachersStatus,
    deleteTeacher,
    updateTeacher,
  };
}
