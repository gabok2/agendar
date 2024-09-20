import { createClient } from "@/app/utils/supabase/client";

export async function deleteStudent(id: string, pathName: string) {
  const supabase = createClient();

  console.log(`Endpoint path: ${pathName.slice(1)}`);
  console.log(`ID to delete: ${id}`);

  await supabase
    .from(`${pathName.slice(1)}`)
    .delete()
    .eq("id", id)
    .single();

  return { message: "Estudante excluído com sucesso!" };
}
