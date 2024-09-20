import { createClientServer } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/client";

export async function fetchStudents(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("students")
    .select(`*, class (name)`, { count: "exact" })
    .range(from, to);

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  const { data: students, count } = await query;
  return { students, count };
}

export async function deleteStudent(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    throw new Error(`Erro ao excluir o estudante: ${error.message}`);
  }

  return { message: "Estudante excluído com sucesso!" };
}
