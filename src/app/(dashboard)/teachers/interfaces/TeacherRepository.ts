import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";
import { ITeacher, UpdateableTeacherFields } from "./Teacher";

export interface ITeacherRepository {
  fetchTeachers(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ teachers: ITeacher[] | null; count: number | null }>;
  fetchTeachersStatus(): Promise<StatusEnumTeacherProps[]>;
  deleteTeacher(id: string): Promise<void>;
  updateTeacher(
    id: number,
    updatedData: UpdateableTeacherFields
  ): Promise<void>;
}
