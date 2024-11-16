import { createStudentService } from "@/app/services/Students/studentService";
import { StudentRepositorySupabase } from "../repositories/studentRepositorySupabase";

const studentRepository = new StudentRepositorySupabase();
const studentService = createStudentService(studentRepository);

export async function useStudentData(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const { students, count } = await studentService.getStudents(
    page,
    pageSize,
    searchTerm
  );

  const updatedStudents =
    students?.map((student) => ({
      ...student,
      class:
        typeof student.class === "string"
          ? student.class
          : student.class?.name || "Sem turma",
    })) || [];

  return { updatedStudents, count };
}
