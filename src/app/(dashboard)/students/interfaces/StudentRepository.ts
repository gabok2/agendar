import { IStudent, UpdateableStudentFields } from "./student";

export interface IStudentRepository {
  fetchStudents(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ students: IStudent[] | null; count: number | null }>;
  deleteStudent(id: string): Promise<void>;
  updateStudent(
    id: string,
    updatedData: UpdateableStudentFields
  ): Promise<void>;
  fetchStudentsByClassId(classId: number): Promise<IStudent[]>;
}
