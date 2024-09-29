import { TableHeaderColumns } from "./components/TableHeaderColumns";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFooter } from "./components/TableFooter";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";
import { Class } from "@/app/utils/types/class";

interface TableProps {
  readonly rows: (Student | Teacher | Class)[];
  readonly columns: {
    key: string;
    label: string;
  }[];
  readonly currentPage: number;
  readonly totalPages: number;
  readonly itemsPerPage: number;
  readonly baseUrl: URLSearchParams;
  readonly tableSelected?: string;
  readonly specialColumns?: {
    [key: string]: (value: string) => { color: string; text: string };
  };
}
export function Table({
  rows,
  columns,
  currentPage,
  itemsPerPage,
  totalPages,
  baseUrl,
  tableSelected,
  specialColumns,
}: TableProps) {
  return (
    <section className="mt-4 pt-4 mb-6 w-ful bg-white rounded-lg shadow-sm">
      <TableHeader baseUrl={baseUrl} tableSelected={tableSelected} />
      <section className="overflow-x-auto">
        <table className="w-full overflow-x-auto">
          <thead>
            <TableHeaderColumns columns={columns} />
          </thead>
          <TableBody
            rows={rows}
            columns={columns}
            specialColumns={specialColumns}
          />
        </table>
      </section>
      <TableFooter
        baseUrl={baseUrl}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
