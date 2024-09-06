import { Typography } from "@/app/components/ui/Typography";

interface TableHeaderProps {
  columns: {
    key: string;
    label: string;
  }[];
}

export const TableHeaderColumns = ({ columns }: TableHeaderProps) => (
  <tr>
    {columns.map((column) => (
      <th key={column.key} className="text-start px-6">
        <Typography variant="body" color="text-secondary" fontWeight="semibold">
          {column.label}
        </Typography>
      </th>
    ))}
    <th className="pl-24 px-6" />
  </tr>
);
