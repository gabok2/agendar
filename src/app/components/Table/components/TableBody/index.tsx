import { Divider } from "@/app/components/ui/Divider";
import { TableRow } from "../TableRow";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";
import { Class } from "@/app/utils/types/class";

interface Column {
  key: string;
  label: string;
}

interface TableBodyProps {
  rows: (Student | Teacher | Class)[];
  columns: Column[];
}

export const TableBody = ({ rows, columns }: TableBodyProps) => (
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
      />
    ))}
    <tr>
      <td colSpan={columns.length + 1}>
        <Divider bottom="mb-5" />
      </td>
    </tr>
  </tbody>
);
