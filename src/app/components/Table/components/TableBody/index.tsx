import { Divider } from "@/app/components/ui/Divider";
import { TableRow } from "../TableRow";

interface TableBodyProps {
  rows: Record<string, string>[];
  columns: {
    key: string;
    label: string;
  }[];
  specialColumns?: {
    [key: string]: (value: string) => { color: string; text: string };
  };
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
