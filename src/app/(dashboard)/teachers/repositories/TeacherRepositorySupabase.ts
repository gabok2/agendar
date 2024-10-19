import { cookies } from "next/headers";
import { ITeacherRepository } from "../interfaces/TeacherRepository";
import { ITeacher, UpdateableTeacherFields } from "../interfaces/Teacher";
import { createClientServer } from "@/app/utils/supabase/server";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";

export class TeacherRepositorySupabase implements ITeacherRepository {
  async fetchTeachers(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ teachers: ITeacher[] | null; count: number | null }> {
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

  async fetchTeachersStatus(): Promise<StatusEnumTeacherProps[]> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);

    const { data: teachersStatus } = await supabase
      .from("statusTeacher")
      .select("*");

    return teachersStatus as StatusEnumTeacherProps[];
  }

  async deleteTeacher(id: string): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);

    const { error } = await supabase.from("teachers").delete().eq("id", id);

    if (error) {
      throw new Error(`Erro ao excluir o professor: ${error.message}`);
    }
  }

  async updateTeacher(
    id: number,
    updatedData: UpdateableTeacherFields
  ): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);

    const { error } = await supabase
      .from("teachers")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      throw new Error(`Erro ao atualizar o professor: ${error.message}`);
    }
  }
}
