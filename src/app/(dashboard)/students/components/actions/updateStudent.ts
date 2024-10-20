"use server";

import { revalidatePath } from "next/cache";
import { StudentRepositorySupabase } from "../../repositories/StudentRepositorySupabase";
import { createStudentService } from "@/app/services/Students/StudentService";
import { UpdateableStudentFields } from "../../interfaces/Student";

const studentRepository = new StudentRepositorySupabase();
const studentService = createStudentService(studentRepository);

export async function updateStudentAction(
  id: string,
  updatedData: UpdateableStudentFields
) {
  await studentService.updateStudent(id, updatedData);
  revalidatePath("/students");
}
