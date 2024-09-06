"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import FilterInput from "@/app/components/ui/FilterInput";
import { Typography } from "@/app/components/ui/Typography";
import { usePathname } from "next/navigation";
import useHandleSearch from "@/app/utils/Search";

interface TableHeaderProps {
  readonly baseUrl: URLSearchParams;
  readonly tableSelected?: string;
}

export const TableHeader = ({ baseUrl, tableSelected }: TableHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathName = usePathname();
  const handleSearch = useHandleSearch();
  return (
    <div className="flex px-6 pb-4 items-center">
      {tableSelected && (
        <div className="border px-9 py-3 mr-4 border-gray rounded-lg flex items-center justify-center">
          <Typography
            variant="caption"
            color="text-secondary"
            fontWeight="regular"
          >
            {tableSelected}
          </Typography>
        </div>
      )}
      <div className=" flex flex-1 w-full">
        <FilterInput
          placeholder="Buscar aluno"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className="pl-12">
        <Button
          color="blue"
          variant="filled"
          onClick={() =>
            handleSearch({
              baseUrl,
              searchPage: pathName,
              searchTerm,
            })
          }
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};
