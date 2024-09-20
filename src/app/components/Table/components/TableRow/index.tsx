import { Typography } from "@/app/components/ui/Typography";
import { DateFormat } from "@/app/utils/DateFormat";
import { PopoverActions } from "./components/PopoverActions";

interface TableRowProps {
  row: Record<string, string>;
  columns: {
    key: string;
    label: string;
  }[];
  isEven: boolean;
  specialColumns?: {
    [key: string]: (value: string) => { color: string; text: string };
  };
}
export const TableRow = ({
  row,
  columns,
  isEven,
  specialColumns,
}: TableRowProps) => (
  <tr className={isEven ? "bg-white" : "bg-background"}>
    {columns.map((column) => {
      const cellValue = row[column.key];
      const specialColumn = specialColumns?.[column.key];
      const { color, text } = specialColumn
        ? specialColumn(cellValue)
        : { color: "text-gray-800", text: cellValue };
      return (
        <td key={column.key} className="py-5 px-6">
          <Typography variant="body" color={color} fontWeight="semibold">
            {column.key === "created_at" ? DateFormat(text) : text}
          </Typography>
        </td>
      );
    })}
    <td className="py-5 flex justify-end pr-6">
      <PopoverActions id={row.id} />
    </td>
  </tr>
);
