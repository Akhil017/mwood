import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prismaErrHandler(error: any) {
  toast.error("Action Failed", {
    description: error.message || JSON.stringify(error),
  });
}
