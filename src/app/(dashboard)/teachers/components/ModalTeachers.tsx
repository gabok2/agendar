"use client";
import { Modal } from "@/app/components/Modal";
import { useStore } from "@/app/store";

export function ModalTeachers() {
  const { isOpen, setIsOpen } = useStore((state) => state);
  return (
    <Modal title="Cadastrar Professor" isOpen={isOpen} setIsOpen={setIsOpen}>
      <p>Professor</p>
    </Modal>
  );
}
