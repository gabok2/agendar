import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function fetchStudents(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
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
