import { Table } from "@/app/components/Table";
import { ModalTeachers } from "./components/ModalTeachers";
import { ParsedUrlQuery } from "querystring";
import { useTeacherSearchParams } from "./hooks/useTeacherSearchParams";
import { useTeacherData } from "./hooks/useTeacherData";
import { usePagination } from "./hooks/usePagination";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "email", label: "E-mail" },
  { key: "statusTeachers", label: "Tipo professor" },
  { key: "created_at", label: "Cadastrado em" },
];

interface TeachersProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Teachers({ searchParams }: TeachersProps) {
  const { page, searchTerm, pageSize, baseUrl } =
    useTeacherSearchParams(searchParams);
  const { updatedTeachers, teachersStatus, count } = await useTeacherData(
    page,
    pageSize,
    searchTerm
  );

  const totalPages = usePagination(count ?? 0, pageSize);

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
      <ModalTeachers teachersStatus={teachersStatus} />
    </div>
  );
}
