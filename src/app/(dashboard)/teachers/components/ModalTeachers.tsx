"use client";
import { useStore } from "@/app/store";
import { ModalTeachersForm } from "./ModalTeachersForm";

export function ModalTeachers() {
  const { isOpen } = useStore((state) => state);

  return isOpen && <ModalTeachersForm />;
}
