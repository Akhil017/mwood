import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prismaErrHandler(error: any) {
  toast.error("Failed to add movie", {
    description: error.message || JSON.stringify(error),
  });
}
