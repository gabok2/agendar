import { Popover } from "@/app/components/Popover";
import { Icons } from "@/app/components/ui/icons";
import { Typography } from "@/app/components/ui/Typography";
import { DateFormat } from "@/app/utils/dateFormat";

interface TableRowProps {
  row: Record<string, string>;
  columns: {
    key: string;
    label: string;
  }[];
  isEven: boolean;
}

const items = [
  {
    label: "Editar",
    color: "",
  },
  {
    label: "Excluir",
    color: "text-cancelSecondary",
  },
];

export const TableRow = ({ row, columns, isEven }: TableRowProps) => (
  <tr className={isEven ? "bg-white" : "bg-background"}>
    {columns.map((column) => (
      <td key={column.key} className="py-5 px-6">
        <Typography variant="body" color="text-gray-800" fontWeight="semibold">
          {column.key === "created_at"
            ? DateFormat(row[column.key])
            : row[column.key]}
        </Typography>
      </td>
    ))}
    <td className="py-5 flex justify-end pr-6">
      <Popover itens={items}>
        <Icons
          type="DotsThreeOutlineVertical"
          size={30}
          className="text-primary"
          weight="fill"
        ></Icons>
      </Popover>
    </td>
  </tr>
);
