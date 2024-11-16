"use server";

import { revalidatePath } from "next/cache";
import { StudentRepositorySupabase } from "../../repositories/studentRepositorySupabase";
import { createStudentService } from "@/app/services/Students/studentService";
import { UpdateableStudentFields } from "../../interfaces/student";

const studentRepository = new StudentRepositorySupabase();
const studentService = createStudentService(studentRepository);

export async function updateStudentAction(
  id: string,
  updatedData: UpdateableStudentFields
) {
  await studentService.updateStudent(id, updatedData);
  revalidatePath("/students");
}
