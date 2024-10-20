import { Typography } from "@/app/components/ui/Typography";
import { PopoverActions } from "./components/PopoverActions";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";
import { Class } from "@/app/utils/types/class";
import { FormatDate } from "@/app/utils/DateFormat";

interface Column {
  key: string;
  label: string;
}

interface SpecialColumn {
  [key: string]: (value: string) => { color: string; text: string };
}

interface TableRowProps {
  row: Student | Teacher | Class | null;
  columns: Column[];
  isEven: boolean;
  specialColumns?: SpecialColumn;
}

export const TableRow = ({
  row,
  columns,
  isEven,
  specialColumns,
}: TableRowProps) => (
  <tr className={isEven ? "bg-white" : "bg-background"}>
    {columns.map((column) => {
      const cellValue = row ? row[column.key as keyof typeof row] : "";
      const specialColumn = specialColumns?.[column.key];
      const { color, text } = specialColumn
        ? specialColumn(cellValue as string)
        : { color: "text-gray-800", text: cellValue as string };
      return (
        <td key={column.key} className="py-5 px-6">
          <Typography variant="body" color={color} fontWeight="semibold">
            {column.key === "created_at" ? FormatDate(text) : text}
          </Typography>
        </td>
      );
    })}
    <td className="py-5 flex justify-end pr-6">
      {row && <PopoverActions id={String(row.id)} row={row} />}
    </td>
  </tr>
);
