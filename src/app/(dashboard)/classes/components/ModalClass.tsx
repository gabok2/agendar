"use client";
import { useStore } from "@/app/store";
import { ModalClassForm } from "./ModalClassForm";
import { IStatusClass, IStatusShift } from "../interfaces/class";

interface ModalClassProps {
  statusClass: IStatusClass[];
  statusShift: IStatusShift[];
}

export function ModalClass({ statusClass, statusShift }: ModalClassProps) {
  const { isOpen } = useStore((state) => state);

  return (
    isOpen && (
      <ModalClassForm statusClass={statusClass} statusShift={statusShift} />
    )
  );
}
