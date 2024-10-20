export interface IStudent {
  id: string;
  type: "students";
  birthDate: string;
  class: string | { name: string };
  class_id: number;
  created_at: string;
  name: string;
  nationalId: string;
  responsibleemail1: string;
  responsibleemail2: string;
}

export type UpdateableStudentFields = Pick<
  IStudent,
  | "name"
  | "responsibleemail1"
  | "responsibleemail2"
  | "birthDate"
  | "nationalId"
>;
