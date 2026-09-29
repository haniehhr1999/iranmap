import { toast } from "react-toastify";

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export const showToast = (
  message: string,
  type: ToastType = "info"
) => {
  toast[type](message);
};