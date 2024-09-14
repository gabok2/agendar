import { createClient } from "@/app/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

let supabase: SupabaseClient;

export async function fetchStudents(
  page: number,
  pageSize: number,
  searchTerm: string
) {
  const cookieStore = cookies();
  supabase = createClient(cookieStore);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("students")
    .select(
      `
    *,
    class (
      name
    )
  `,
      { count: "exact" }
    )
    .range(from, to);

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  const { data: students, count } = await query;
  return { students, count };
}

export async function fetchClassTurm() {
  const { data: classTurm } = await supabase.from("class").select("*");
  return classTurm || [];
}

export async function fetchTeachers() {
  const { data: teachers } = await supabase.from("teachers")
    .select(`*, class:class_id (
      name
    )`);
  return teachers || [];
}
