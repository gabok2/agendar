"use server";

import { revalidatePath } from "next/cache";
import { updateTeacher } from "../../endpoints";
import { UpdateableTeacherFields } from "@/app/utils/types/teacher";

export async function updateTeacherAction(
  id: number,
  updatedData: UpdateableTeacherFields
) {
  await updateTeacher(id, updatedData);
  revalidatePath("/teachers");
}
