"use server";

import { createStudentService } from "@/app/services/Students/studentService";
import { StudentRepositorySupabase } from "@/app/(dashboard)/students/repositories/studentRepositorySupabase";

const studentRepository = new StudentRepositorySupabase();
const studentService = createStudentService(studentRepository);

export async function fetchClassStudents(classId: number) {
  const students = await studentService.fetchStudentsByClassId(classId);
  return students;
}
