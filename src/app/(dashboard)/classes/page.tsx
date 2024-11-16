import { Table } from "@/app/components/Table";
import { ParsedUrlQuery } from "querystring";
import { useClassData } from "./hooks/useClassData";
import { useClassSearchParams } from "./hooks/useClassSearchParams";
import { usePagination } from "./hooks/usePagination";
import { ModalClass } from "./components/ModalClass";

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "shift", label: "Turno" },
  { key: "total_students", label: "Quantidade Alunos" },
  { key: "assistant", label: "Auxiliar" },
  { key: "head_teacher", label: "Titular" },
  { key: "created_at", label: "Cadastrado em" },
  { key: "statusAdministration", label: "Status" },
];

interface ClassesProps {
  readonly searchParams: ParsedUrlQuery;
}

export default async function Classes({ searchParams }: ClassesProps) {
  const { page, searchTerm, pageSize, baseUrl } =
    useClassSearchParams(searchParams);

  const { updatedClasses, count, statusClass, statusShift } =
    await useClassData(page, pageSize, searchTerm);

  const totalPages = usePagination(count ?? 0, pageSize);

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
      <ModalClass statusClass={statusClass} statusShift={statusShift} />
    </div>
  );
}
