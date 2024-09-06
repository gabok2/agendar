import { Pagination } from "../TablePagination";

interface TableFooterProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  baseUrl: URLSearchParams;
}
export const TableFooter = ({
  itemsPerPage,
  currentPage,
  totalPages,
  baseUrl,
}: TableFooterProps) => (
  <div className="w-full ">
    <Pagination
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl={baseUrl}
    />
  </div>
);
