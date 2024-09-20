"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Typography } from "../ui/Typography";
import { Icons } from "../ui/icons";
import { ReactNode } from "react";

interface ModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: (value: boolean) => void;
  readonly children: ReactNode;
  readonly title: string;
}

export function Modal({ isOpen, setIsOpen, title, children }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center ">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <DialogPanel className="relative  space-y-4 border bg-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <Typography
              color="text-gray-600"
              variant="h2"
              fontWeight="semibold"
            >
              {title}
            </Typography>
            <button onClick={() => setIsOpen(false)}>
              <Icons type="X" size={24} />
            </button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
