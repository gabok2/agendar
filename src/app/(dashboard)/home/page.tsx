import { Table } from "@/app/components/Table";
import { Card } from "./components/Card";
import { createClient } from "@/app/utils/supabase/server";
import { ParsedUrlQuery } from "querystring";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "responsibleemail1", label: "E-mail responsável 1" },
  { key: "responsibleemail2", label: "E-mail responsável 2" },
  { key: "created_at", label: "Cadastrado em" },
];

const DEFAULT_PAGE_SIZE = 10;

interface HomeProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, searchTerm, pageSize } = parseSearchParams(searchParams);
  const supabase = createClient();

  const { students, count } = await fetchStudents(
    supabase,
    page,
    pageSize,
    searchTerm
  );
  const totalPages = Math.ceil((count ?? 0) / pageSize);

  const classTurm = await fetchClassTurm(supabase);
  const teachers = await fetchTeachers(supabase);

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  function parseSearchParams(searchParams: ParsedUrlQuery) {
    const page = parseInt(searchParams.page as string) || 1;
    const searchTerm = (searchParams.search as string) || "";
    const pageSize =
      parseInt(searchParams.pageSize as string) || DEFAULT_PAGE_SIZE;
    return { page, searchTerm, pageSize };
  }

  async function fetchStudents(
    supabase: any,
    page: number,
    pageSize: number,
    searchTerm: string
  ) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("students")
      .select("*", { count: "exact" })
      .range(from, to);

    if (searchTerm) {
      query = query.ilike("name", `%${searchTerm}%`);
    }

    const { data: students, count } = await query;
    return { students, count };
  }

  async function fetchClassTurm(supabase: any) {
    const { data: classTurm } = await supabase.from("class").select("*");
    return classTurm || [];
  }

  async function fetchTeachers(supabase: any) {
    const { data: teachers } = await supabase
      .from("teachers")
      .select(`*, class(name)`);
    return teachers || [];
  }

  return (
    <div className="h-full px-12 w-full">
      <Card classTurm={classTurm} teachers={teachers} />
      <Table
        columns={COLUMNS}
        rows={students}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        baseUrl={baseUrl}
        tableSelected="Alunos"
      />
    </div>
  );
}
