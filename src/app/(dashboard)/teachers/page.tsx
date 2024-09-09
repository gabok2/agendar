import { Table } from "@/app/components/Table";
import { StatusEnumTeacher } from "@/app/utils/StatusEnum";
import { ParsedUrlQuery } from "querystring";
import { fetchTeachers } from "./endpoints";

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

  const { teachers, count } = await fetchTeachers(page, pageSize, searchTerm);
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
