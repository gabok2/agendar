"use server";

import { revalidatePath } from "next/cache";
import { UpdateableTeacherFields } from "@/app/utils/types/teacher";
import { TeacherRepositorySupabase } from "../../repositories/TeacherRepositorySupabase";
import { createTeacherService } from "../../service/TeacherService";

const teacherRepository = new TeacherRepositorySupabase();
const teacherService = createTeacherService(teacherRepository);

export async function updateTeacherAction(
  id: number,
  updatedData: UpdateableTeacherFields
) {
  await teacherService.updateTeacher(id, updatedData);
  revalidatePath("/teachers");
}
