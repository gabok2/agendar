import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export async function fetchClasses(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("class")
    .select(
      `
      *,
      head_teacher:teachers!head_teacher_id(*),
      assistant:teachers!assistant_id(*)
    `,
      { count: "exact" }
    )
    .range(from, to);

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  const { data: classes, count } = await query;
  return { classes, count };
}
