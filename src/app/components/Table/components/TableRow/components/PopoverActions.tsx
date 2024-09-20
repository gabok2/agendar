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

export const PopoverActions = ({ id }: { id: string }) => {
  const { setIsOpen } = useStore((state) => state);
  const pathName = usePathname();

  const itensSelected = useCallback(
    async (id: string, label: string, pathName: string) => {
      if (label === "Excluir") {
        await deleteStudent(id, pathName);
      } else {
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
