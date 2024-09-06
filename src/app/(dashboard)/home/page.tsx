import { Table } from "@/app/components/Table";
import { Card } from "./components/Card";
import { createClient } from "@/app/utils/supabase/server";

const columns = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "responsibleemail1", label: "E-mail responsável 1" },
  { key: "responsibleemail2", label: "E-mail responsável 2" },
  { key: "created_at", label: "Cadastrado em" },
];

export default async function Home({
  searchParams,
}: {
  readonly searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const searchTerm =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const pageSize =
    typeof searchParams.pageSize === "string"
      ? parseInt(searchParams.pageSize)
      : 10;

  let PAGE_SIZE = pageSize;

  const supabase = createClient();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("students")
    .select("*", { count: "exact" })
    .range(from, to);

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  let { data: students, count } = await query;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  let { data: classTurm } = await supabase.from("class").select("*");

  let { data: teachers } = await supabase
    .from("teachers")
    .select(`*, class(name)`);

  return (
    <div className=" h-full px-12 w-full">
      <Card classTurm={classTurm || []} teachers={teachers || []} />
      <Table
        columns={columns}
        rows={students || []}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={PAGE_SIZE}
        baseUrl={baseUrl}
        tableSelected="Alunos"
      />
    </div>
  );
}
