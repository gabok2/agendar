import { IStudentRepository } from "../../(dashboard)/students/interfaces/StudentRepository";
import {
  IStudent,
  UpdateableStudentFields,
} from "../../(dashboard)/students/interfaces/Student";

export interface StudentService {
  getStudents(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ students: IStudent[] | null; count: number | null }>;
  deleteStudent(id: string): Promise<void>;
  updateStudent(
    id: string,
    updatedData: UpdateableStudentFields
  ): Promise<void>;
}

export function createStudentService(
  studentRepository: IStudentRepository
): StudentService {
  async function getStudents(
    page: number,
    pageSize: number,
    searchTerm: string
  ) {
    return studentRepository.fetchStudents(page, pageSize, searchTerm);
  }

  async function deleteStudent(id: string) {
    await studentRepository.deleteStudent(id);
  }

  async function updateStudent(
    id: string,
    updatedData: UpdateableStudentFields
  ) {
    await studentRepository.updateStudent(id, updatedData);
  }

  return {
    getStudents,
    deleteStudent,
    updateStudent,
  };
}
