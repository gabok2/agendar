import { Divider } from "@/app/components/ui/Divider";
import { TableRow } from "../TableRow";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";
import { Class } from "@/app/utils/types/class";

interface Column {
  key: string;
  label: string;
}

interface SpecialColumn {
  [key: string]: (value: string) => { color: string; text: string };
}

interface TableBodyProps {
  rows: (Student | Teacher | Class)[];
  columns: Column[];
  specialColumns?: SpecialColumn;
}

export const TableBody = ({
  rows,
  columns,
  specialColumns,
}: TableBodyProps) => (
  <tbody>
    <tr>
      <td colSpan={columns.length + 1}>
        <Divider top="mt-7" />
      </td>
    </tr>
    {rows.map((row, index) => (
      <TableRow
        key={row.id}
        row={row}
        columns={columns}
        isEven={index % 2 === 0}
        specialColumns={specialColumns}
      />
    ))}
    <tr>
      <td colSpan={columns.length + 1}>
        <Divider bottom="mb-5" />
      </td>
    </tr>
  </tbody>
);
