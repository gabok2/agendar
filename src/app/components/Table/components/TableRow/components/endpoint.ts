import { createClientServer } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function deleteTableRow(id: string, pathName: string) {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);

  await supabase.from(`${pathName}`).delete().eq("id", id).single();

  return { message: "Estudante excluído com sucesso!" };
}
