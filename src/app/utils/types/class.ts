export interface Class {
  id: string;
  type: "class";
  assistant: string;
  assistant_id: number | null;
  class_id: number;
  created_at: string;
  head_teacher: string;
  head_teacher_id: number | null;
  name: string;
  shift: string;
  status: string;
  total_students: number;
}
