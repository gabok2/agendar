import React from "react";
import {
  ToastContainer,
  toast,
  ToastOptions,
  Id,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";
import { ToastMessage } from "@/app/utils/types/toastTypes";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ShowToastOptions extends ToastOptions {
  id?: Id;
}

export const showToast = (
  { type, message }: ToastMessage,
  options?: ShowToastOptions
): Id => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  };

  if (options?.id) {
    toast.update(options.id, {
      render: message,
      type: type as TypeOptions,
      ...toastOptions,
    });
    return options.id;
  }

  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "pending":
      return toast.info(message, { ...toastOptions, autoClose: false });
    default:
      return toast(message, toastOptions);
  }
};

export default function ToastProvider({
  children,
}: Readonly<ToastProviderProps>) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
