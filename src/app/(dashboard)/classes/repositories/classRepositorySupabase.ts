import { cookies } from "next/headers";

import { createClientServer } from "@/app/utils/supabase/server";
import { IClassRepository } from "../interfaces/classRepository";
import { IClass, IStatusClass, IStatusShift } from "../interfaces/class";

export class ClassRepositorySupabase implements IClassRepository {
  async fetchClass(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ classes: IClass[] | null; count: number | null }> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
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

  async fetchStatusClass(): Promise<IStatusClass[]> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
    const { data: statusClass } = await supabase
      .from("statusClass")
      .select("*");
    return statusClass as IStatusClass[];
  }

  async fetchStatusShift(): Promise<IStatusShift[]> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
    const { data: statusShiftClass } = await supabase
      .from("statusShift")
      .select("*");

    return statusShiftClass as IStatusShift[];
  }

  async deleteClass(id: string): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);
    const { error } = await supabase.from("classes").delete().eq("id", id);
    if (error) {
      throw new Error(`Erro ao excluir a turma: ${error.message}`);
    }
  }
}
