export interface ITeacher {
  id: number;
  created_at: string;
  name: string;
  email: string;
  status_teacher: number;
  class_id: number | null;
  type: string;
  nationalId: string;
  academic: string;
  birthDate: string;
  statusTeachers: string;
  class: string | { name: string };
}

export type UpdateableTeacherFields = Pick<
  ITeacher,
  "name" | "email" | "status_teacher" | "academic" | "birthDate" | "nationalId"
>;
