import { createTeacherService } from "../service/TeacherService";
import { TeacherRepositorySupabase } from "../repositories/TeacherRepositorySupabase";
import { StatusEnumTeacher } from "@/app/utils/StatusEnum";

const teacherRepository = new TeacherRepositorySupabase();
const teacherService = createTeacherService(teacherRepository);

export async function useTeacherData(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const { teachers, count } = await teacherService.getTeachers(
    page,
    pageSize,
    searchTerm
  );
  const teachersStatus = await teacherService.getTeachersStatus();

  const updatedTeachers =
    teachers?.map((teacher) => ({
      ...teacher,
      statusTeachers: StatusEnumTeacher({
        statusEnum: teacher.status_teacher,
      }),
      class:
        typeof teacher.class === "string"
          ? teacher.class
          : teacher.class?.name || "Sem turma",
    })) || [];

  return { updatedTeachers, teachersStatus, count };
}
