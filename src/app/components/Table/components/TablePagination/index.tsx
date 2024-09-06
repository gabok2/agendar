import Dropdown from "@/app/components/Dropdown";
import { Icons } from "@/app/components/ui/icons";
import Link from "next/link";

interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  baseUrl: URLSearchParams;
}

export const Pagination = ({
  itemsPerPage,
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) => {
  const getPageUrl = (pageNum: number) => {
    const newUrl = new URLSearchParams(baseUrl);
    newUrl.set("page", pageNum.toString());

    return `home/?${newUrl.toString()}`;
  };

  const PageSize = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full px-6 pb-5">
      <div className="flex items-center">
        <Dropdown
          baseUrl={baseUrl}
          itemsPerPage={itemsPerPage}
          PageSize={PageSize}
        />
        <p className="pl-4 text-zinc-400">Itens por página</p>
      </div>
      <div className="flex items-center">
        <p>
          {currentPage} de {totalPages} páginas
        </p>
        <div className={`ml-6 ${currentPage > 1 ? "" : "text-zinc-300"}`}>
          {currentPage > 1 ? (
            <Link href={getPageUrl(currentPage - 1)}>
              <Icons type="CaretLeft" size={18} />
            </Link>
          ) : (
            <Icons type="CaretLeft" size={18} />
          )}
        </div>
        <div
          className={`ml-2 ${currentPage < totalPages ? "" : "text-zinc-300"}`}
        >
          {currentPage < totalPages ? (
            <Link href={getPageUrl(currentPage + 1)}>
              <Icons type="CaretRight" size={18} />
            </Link>
          ) : (
            <Icons type="CaretRight" size={18} />
          )}
        </div>
      </div>
    </div>
  );
};
