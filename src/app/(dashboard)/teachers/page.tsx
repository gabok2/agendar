import { Table } from "@/app/components/Table";
import { StatusEnumTeacher } from "@/app/utils/StatusEnum";
import { createClient } from "@/app/utils/supabase/server";

const columns = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "email", label: "E-mail" },
  { key: "statusTeachers", label: "Tipo professor" },
  { key: "created_at", label: "Cadastrado em" },
];

export default async function Teachers({
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
  query = query.range(from, to);

  const { data: teachers, count } = await query;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  const updatedTeachers = teachers?.map((teacher) => {
    return {
      ...teacher,
      statusTeachers: StatusEnumTeacher({
        statusEnumTeacher: teacher.status_teacher,
      }),
      class: teacher.class?.[0]?.name,
    };
  });

  return (
    <div className=" h-full px-12 w-full">
      <Table
        columns={columns}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={PAGE_SIZE}
        baseUrl={baseUrl}
        rows={updatedTeachers || []}
      />
    </div>
  );
}
