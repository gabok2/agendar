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
  const getPlaceholderText = (path: string) => {
    if (path === "/teachers") return "Buscar professor";
    if (path === "/students") return "Buscar aluno";
    if (path === "/classes") return "Buscar turma";
    return "Buscar aluno";
  };

  const placeholderText = getPlaceholderText(pathName);

  return (
    <div className="flex px-6 pb-4 items-center">
      {tableSelected && (
        <div className="border px-9 py-3 mr-4 border-grayPrimary rounded-lg flex items-center justify-center">
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
          placeholder={placeholderText}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className="pl-12 flex items-center">
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
        <Button className="ml-4" color="blue" variant="outlined">
          Cadastrar
        </Button>
      </div>
    </div>
  );
};
