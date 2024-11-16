import { Typography } from "@/app/components/ui/Typography";
import { PopoverActions } from "./components/PopoverActions";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";
import { Class } from "@/app/utils/types/class";
import { FormatDate } from "@/app/utils/DateFormat";
import { useSpecialColumn } from "@/app/(dashboard)/classes/hooks/useSpecialColumn";

interface Column {
  key: string;
  label: string;
}
interface TableRowProps {
  row: Student | Teacher | Class | null;
  columns: Column[];
  isEven: boolean;
}

export const TableRow = ({ row, columns, isEven }: TableRowProps) => (
  <tr className={isEven ? "bg-white" : "bg-background"}>
    {columns.map((column) => {
      const cellValue = row ? row[column.key as keyof typeof row] : "";
      const specialColumnResult = useSpecialColumn({
        statusAdministration: cellValue as string,
        colors: {
          active: "text-green-400",
          planning: "text-primary",
          default: "text-gray-800",
        },
      });
      return (
        <td key={column.key} className="py-5 px-6">
          <Typography
            variant="body"
            color={specialColumnResult.color}
            fontWeight="semibold"
          >
            {column.key === "created_at"
              ? FormatDate(specialColumnResult.text)
              : specialColumnResult.text}
          </Typography>
        </td>
      );
    })}
    <td className="py-5 flex justify-end pr-6">
      {row && <PopoverActions id={String(row.id)} row={row} />}
    </td>
  </tr>
);
