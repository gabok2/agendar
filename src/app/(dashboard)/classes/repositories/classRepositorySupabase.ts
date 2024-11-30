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

  async updateClass(
    id: string,
    updates: {
      statusShift: number;
      name: string;
      status: number;
      headTeacherName: string;
      assistantName: string;
      headTeacherId: number;
      assistantId: number;
      studentsIds: string[];
    }
  ): Promise<void> {
    const cookieStore = cookies();
    const supabase = createClientServer(cookieStore);

    const { error: transactionError } = await supabase
      .from("class")
      .update({
        name: updates.name,
        status: updates.status,
        statusShift: updates.statusShift,
      })
      .eq("class_id", id);

    if (transactionError) {
      throw new Error(
        `Erro ao atualizar dados da turma: ${transactionError.message}`
      );
    }

    // Atualiza o professor principal
    const { error: headTeacherUpdateError } = await supabase
      .from("teachers")
      .update({
        name: updates.headTeacherName,
        status_teacher: 1,
      })
      .eq("id", updates.headTeacherId);

    if (headTeacherUpdateError) {
      throw new Error(
        `Erro ao atualizar o professor principal: ${headTeacherUpdateError.message}`
      );
    }

    // Atualiza o assistente
    const { error: assistantUpdateError } = await supabase
      .from("teachers")
      .update({
        name: updates.assistantName,
        status_teacher: 2,
      })
      .eq("id", updates.assistantId);

    if (assistantUpdateError) {
      throw new Error(
        `Erro ao atualizar o assistente: ${assistantUpdateError.message}`
      );
    }

    updates.studentsIds.forEach(async (studentId) => {
      const { error } = await supabase
        .from("students")
        .update({
          class_id: null,
        })
        .eq("id", studentId);
      if (error) {
        throw new Error(`Erro ao atualizar o estudante: ${error.message}`);
      }
    });
  }
}
