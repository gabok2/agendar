import { Table } from "@/app/components/Table";
import { ParsedUrlQuery } from "querystring";
import { ModalStudents } from "./components/ModalStudents";
import { usePagination } from "./hooks/usePagination";
import { useStudentSearchParams } from "./hooks/useStudentSearchParams";
import { useStudentData } from "./hooks/useStudentData";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "class", label: "Turma" },
  { key: "responsibleemail1", label: "E-mail responsável 1" },
  { key: "responsibleemail2", label: "E-mail responsável 2" },
  { key: "created_at", label: "Cadastrado em" },
];

interface StudentsProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Students({ searchParams }: StudentsProps) {
  const { page, searchTerm, pageSize, baseUrl } =
    useStudentSearchParams(searchParams);
  const { updatedStudents, count } = await useStudentData(
    page,
    pageSize,
    searchTerm
  );

  const totalPages = usePagination(count ?? 0, pageSize);

  return (
    <div className="h-full px-12 w-full">
      <Table
        columns={COLUMNS}
        rows={updatedStudents}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        baseUrl={baseUrl}
      />
      <ModalStudents />
    </div>
  );
}
