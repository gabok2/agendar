"use client";

import { Popover } from "@/app/components/Popover";
import { Icons } from "@/app/components/ui/icons";
import { usePathname } from "next/navigation";
import { deleteStudent } from "./endpoint";
import { useCallback } from "react";
import { useStore } from "@/app/store";

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

export const PopoverActions = ({ id, row }: { id: string; row: any }) => {
  const { setIsOpen, setObjetcStructure } = useStore((state) => state);
  const pathName = usePathname();
  const itensSelected = useCallback(
    async (id: string, label: string, pathName: string) => {
      console.log(id);
      if (label === "Excluir") {
        await deleteStudent(id, pathName);
      } else {
        setObjetcStructure(row.id === id ? row : {});
        setIsOpen(true);
      }
    },
    [id, pathName]
  );

  return (
    <Popover
      id={id}
      itens={items}
      itensSelected={(id, label) => itensSelected(id, label, pathName)}
    >
      <Icons
        type="DotsThreeOutlineVertical"
        size={30}
        className="text-primary"
        weight="fill"
      />
    </Popover>
  );
};
