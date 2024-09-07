import { Table } from "@/app/components/Table";
import { StatusEnumTeacher } from "@/app/utils/StatusEnum";
import { createClient } from "@/app/utils/supabase/server";
import { ParsedUrlQuery } from "querystring";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "email", label: "E-mail" },
  { key: "statusTeachers", label: "Tipo professor" },
  { key: "created_at", label: "Cadastrado em" },
];

const DEFAULT_PAGE_SIZE = 10;

interface TeachersProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Teachers({ searchParams }: TeachersProps) {
  const { page, searchTerm, pageSize } = parseSearchParams(searchParams);
  const supabase = createClient();

  const { teachers, count } = await fetchTeachers(
    supabase,
    page,
    pageSize,
    searchTerm
  );
  const totalPages = Math.ceil((count ?? 0) / pageSize);

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  const updatedTeachers = updateTeachersData(teachers);

  function parseSearchParams(searchParams: ParsedUrlQuery) {
    const page = parseInt(searchParams.page as string) || 1;
    const searchTerm = (searchParams.search as string) || "";
    const pageSize =
      parseInt(searchParams.pageSize as string) || DEFAULT_PAGE_SIZE;
    return { page, searchTerm, pageSize };
  }

  async function fetchTeachers(
    supabase: any,
    page: number,
    pageSize: number,
    searchTerm: string
  ) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from("teachers").select(
      `
    *,
    class (
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

  function updateTeachersData(teachers: any[] | null) {
    return (
      teachers?.map((teacher) => ({
        ...teacher,
        statusTeachers: StatusEnumTeacher({
          statusEnumTeacher: teacher.status_teacher,
        }),
        class: teacher.class?.[0]?.name,
      })) || []
    );
  }

  return (
    <div className="h-full px-12 w-full">
      <Table
        columns={COLUMNS}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        baseUrl={baseUrl}
        rows={updatedTeachers}
      />
    </div>
  );
}
