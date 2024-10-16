"use client";
import { useStore } from "@/app/store";
import { ModalTeachersForm } from "./ModalTeachersForm";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";

interface ModalTeachersProps {
  readonly teachersStatus: StatusEnumTeacherProps[];
}

export function ModalTeachers({ teachersStatus }: ModalTeachersProps) {
  const { isOpen } = useStore((state) => state);

  return isOpen && <ModalTeachersForm teachersStatus={teachersStatus} />;
}
