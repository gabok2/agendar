"use server";

import { createClassService } from "@/app/services/Class/classService";
import { ClassRepositorySupabase } from "../repositories/classRepositorySupabase";
import { ClassUpdates } from "../interfaces/class";
import { StudentRepositorySupabase } from "../../students/repositories/StudentRepositorySupabase";
import { createStudentService } from "@/app/services/Students/StudentService";
import { revalidatePath } from "next/cache";

const studentRepository = new StudentRepositorySupabase();
const studentService = createStudentService(studentRepository);

const classRepository = new ClassRepositorySupabase();
const classService = createClassService(classRepository);

export async function fetchClassStudents(classId: number) {
  const students = await studentService.fetchStudentsByClassId(classId);
  return students;
}

export async function updateClassAction(id: string, updates: ClassUpdates) {
  const updatedClass = await classService.updateClass(id, updates);
  revalidatePath("/classes");
  return updatedClass;
}
