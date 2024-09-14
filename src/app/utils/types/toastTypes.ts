export type ToastType = "success" | "error" | "info" | "warning" | "pending";

export interface ToastMessage {
  type: ToastType;
  message: string;
}
