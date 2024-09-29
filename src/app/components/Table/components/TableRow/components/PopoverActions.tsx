"use client";

import { Popover } from "@/app/components/Popover";
import { Icons } from "@/app/components/ui/icons";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useStore } from "@/app/store";
import { deleteAction } from "./actions/deleteAction";
import { Class } from "@/app/utils/types/class";
import { Student } from "@/app/utils/types/student";
import { Teacher } from "@/app/utils/types/teacher";

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

interface PopoverActionsProps {
  id: string;
  row: Student | Teacher | Class;
}

export const PopoverActions = ({ id, row }: PopoverActionsProps) => {
  const { setIsOpen, setObjectStructure } = useStore((state) => state);
  const pathName = usePathname();

  const itensSelected = useCallback(
    async (id: string, label: string, pathName: string) => {
      if (label === "Excluir") {
        await deleteAction(id, pathName.slice(1), row.type);
      } else {
        setObjectStructure(row);
        setIsOpen(true);
      }
    },
    [id, pathName, row, setIsOpen, setObjectStructure]
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
