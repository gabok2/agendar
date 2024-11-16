import { createClassService } from "@/app/services/Class/classService";
import { ClassRepositorySupabase } from "../repositories/classRepositorySupabase";
import { StatusEnumClass, StatusEnumShift } from "@/app/utils/StatusEnum";

const classRepository = new ClassRepositorySupabase();
const classService = createClassService(classRepository);

export async function useClassData(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const { classes, count } = await classService.getClasses(
    page,
    pageSize,
    searchTerm
  );

  const updatedClasses =
    classes?.map((classItem) => ({
      ...classItem,
      head_teacher:
        typeof classItem.head_teacher === "string"
          ? classItem.head_teacher
          : classItem.head_teacher?.name || "Sem Titular",
      assistant:
        typeof classItem.assistant === "string"
          ? classItem.assistant
          : classItem.assistant?.name || "Sem Auxiliar",
      statusAdministration: StatusEnumClass({ statusEnum: classItem.status }),
      shift: StatusEnumShift({ statusEnum: classItem.statusShift }),
    })) || [];

  const statusClass = await classService.getStatusClass();
  const statusShift = await classService.getStatusShift();

  return { updatedClasses, count, statusClass, statusShift };
}
