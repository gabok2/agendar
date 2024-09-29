"use client";
import { useStore } from "@/app/store";
import { ModalStudentsForm } from "./ModalStudentsForm";

export function ModalStudents() {
  const { isOpen } = useStore((state) => state);

  return isOpen && <ModalStudentsForm />;
}
