import { Table } from "@/app/components/Table";
import { Card } from "./components/Card";
import { ParsedUrlQuery } from "querystring";
import { fetchClassTurm, fetchStudents, fetchTeachers } from "./endpoints";

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

  const { students, count } = await fetchStudents(page, pageSize, searchTerm);
  const totalPages = Math.ceil((count ?? 0) / pageSize);

  const updatedStudents = updateStudentsData(students);

  const classTurm = await fetchClassTurm();

  const teachers = await fetchTeachers();

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  function parseSearchParams(searchParams: ParsedUrlQuery) {
    const page = parseInt(searchParams.page as string) || 1;
    const searchTerm = (searchParams.search as string) || "";
    const pageSize =
      parseInt(searchParams.pageSize as string) || DEFAULT_PAGE_SIZE;
    return { page, searchTerm, pageSize };
  }

  function updateStudentsData(students: any[] | null) {
    return (
      students?.map((student) => ({
        ...student,
        class: student.class.name,
      })) || []
    );
  }
  console.log(updatedStudents);
  return (
    <div className="h-full px-12 w-full">
      <Card classTurm={classTurm} teachers={teachers} />
      <Table
        columns={COLUMNS}
        rows={updatedStudents}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        baseUrl={baseUrl}
        tableSelected="Alunos"
      />
    </div>
  );
}
