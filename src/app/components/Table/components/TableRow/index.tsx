import { Popover } from "@/app/components/Popover";
import { Icons } from "@/app/components/ui/icons";
import { Typography } from "@/app/components/ui/Typography";
import { DateFormat } from "@/app/utils/DateFormat";

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

export const TableRow = ({
  row,
  columns,
  isEven,
  specialColumns,
}: TableRowProps) => (
  <tr className={isEven ? "bg-white" : "bg-background"}>
    {columns.map((column) => {
      const cellValue = row[column.key];
      const specialColumn = specialColumns && specialColumns[column.key];
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
