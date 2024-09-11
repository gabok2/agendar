import { Table } from "@/app/components/Table";
import { ParsedUrlQuery } from "querystring";
import { fetchClasses } from "./endpoints";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "shift", label: "Turno" },
  { key: "total_students", label: "Quantidade Alunos" },
  { key: "assistant", label: "Auxiliar" },
  { key: "head_teacher", label: "Titular" },
  { key: "created_at", label: "Cadastrado em" },
  { key: "status", label: "Status" },
];

const DEFAULT_PAGE_SIZE = 10;

interface ClassesProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Classes({ searchParams }: ClassesProps) {
  const { page, searchTerm, pageSize } = parseSearchParams(searchParams);

  const { classes, count } = await fetchClasses(page, pageSize, searchTerm);
  const totalPages = Math.ceil((count ?? 0) / pageSize);

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  const updatedClasses = updateClassesData(classes);

  function parseSearchParams(searchParams: ParsedUrlQuery) {
    const page = parseInt(searchParams.page as string) || 1;
    const searchTerm = (searchParams.search as string) || "";
    const pageSize =
      parseInt(searchParams.pageSize as string) || DEFAULT_PAGE_SIZE;
    return { page, searchTerm, pageSize };
  }

  function updateClassesData(classes: any[] | null) {
    return (
      classes?.map((classItem) => ({
        ...classItem,
        head_teacher: classItem.head_teacher?.name ?? "Sem Titular",
        assistant: classItem.assistant?.name ?? "Sem Auxiliar",
      })) || []
    );
  }

  console.log(updatedClasses);

  return (
    <div className="h-full px-12 w-full">
      <Table
        columns={COLUMNS}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        baseUrl={baseUrl}
        rows={updatedClasses}
      />
    </div>
  );
}
