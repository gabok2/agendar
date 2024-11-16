export interface IClass {
  id: string;
  type: "class";
  assistant: string | { name: string };
  assistant_id: number;
  class_id: number;
  created_at: string;
  head_teacher: string | { name: string };
  head_teacher_id: number;
  name: string;
  statusShift: string;
  statusAdministration: string;
  status: string;
  total_students: number;
}

export interface IStatusClass {
  id: number;
  created_at: string;
  name: string;
}

export interface IStatusShift {
  id: number;
  created_at: string;
  name: string;
}
