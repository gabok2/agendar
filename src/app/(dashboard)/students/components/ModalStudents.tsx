"use client";
import { Modal } from "@/app/components/Modal";
import { useStore } from "@/app/store";

export function ModalStudents() {
  const { isOpen, setIsOpen } = useStore((state) => state);
  return (
    <Modal title="Cadastrar aluno(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
      <p>estudante</p>
    </Modal>
  );
}
