import { createClientServer } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { Teacher, UpdateableTeacherFields } from "@/app/utils/types/teacher";

export async function fetchTeachers(
  page: number,
  pageSize: number,
  searchTerm: string
): Promise<{ teachers: Teacher[] | null; count: number | null }> {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("teachers").select(
    `
    *,
    class:class_id (
      name
    )
  `,
    { count: "exact" }
  );

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  const { data: teachers, count } = await query.range(from, to);

  return { teachers, count };
}

export async function fetchTeachersStatus() {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);

  const { data: teachersStatus } = await supabase
    .from("statusTeacher")
    .select("*");

  return teachersStatus;
}

export async function deleteTeacher(id: string) {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);

  const { error } = await supabase.from("teachers").delete().eq("id", id);

  if (error) {
    throw new Error(`Erro ao excluir o professor: ${error.message}`);
  }

  return { message: "Professor excluído com sucesso!" };
}

export async function updateTeacher(
  id: number,
  updatedData: UpdateableTeacherFields
) {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);

  const { error } = await supabase
    .from("teachers")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    throw new Error(`Erro ao atualizar o professor: ${error.message}`);
  }

  return { message: "Professor atualizado com sucesso!" };
}
