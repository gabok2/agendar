"use server";

import { revalidatePath } from "next/cache";
import { updateStudent } from "../../endpoints";

export async function updateStudentAction(id: string, updatedData: any) {
  await updateStudent(id, updatedData);
  revalidatePath("/students");
}
