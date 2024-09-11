import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export async function fetchTeachers(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("teachers").select(
    `
    *,
    class:class_id (name)
  `,
    { count: "exact" }
  );

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  const { data: teachers, count } = await query.range(from, to);
  return { teachers, count };
}
