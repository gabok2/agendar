import { Table } from "@/app/components/Table";
import { StatusEnumTeacher } from "@/app/utils/StatusEnum";
import { ParsedUrlQuery } from "querystring";
import { fetchTeachers, fetchTeachersStatus } from "./endpoints";
import { ModalTeachers } from "./components/ModalTeachers";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";
import { Teacher } from "@/app/utils/types/teacher";

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
  const teachersStatus =
    (await fetchTeachersStatus()) as StatusEnumTeacherProps[];

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

  function updateTeachersData(teachers: Teacher[] | null) {
    return (
      teachers?.map((teacher) => ({
        ...teacher,
        statusTeachers: StatusEnumTeacher({
          statusEnum: teacher.status_teacher,
        }),
        class:
          typeof teacher.class === "string"
            ? teacher.class
            : teacher.class?.name || "Sem turma",
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
      <ModalTeachers teachersStatus={teachersStatus} />
    </div>
  );
}
