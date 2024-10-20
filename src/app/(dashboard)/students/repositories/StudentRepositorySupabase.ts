import { cookies } from "next/headers";
import { IStudentRepository } from "../interfaces/StudentRepository";
import { IStudent, UpdateableStudentFields } from "../interfaces/Student";
import { createClientServer } from "@/app/utils/supabase/server";

export class StudentRepositorySupabase implements IStudentRepository {
  async fetchStudents(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ students: IStudent[] | null; count: number | null }> {
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

  async deleteStudent(id: string): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      throw new Error(`Erro ao excluir o estudante: ${error.message}`);
    }
  }

  async updateStudent(
    id: string,
    updatedData: UpdateableStudentFields
  ): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
    const { error } = await supabase
      .from("students")
      .update(updatedData)
      .eq("id", id);
    if (error) {
      throw new Error(`Erro ao atualizar o estudante: ${error.message}`);
    }
  }
}
