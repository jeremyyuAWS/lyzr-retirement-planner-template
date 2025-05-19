import { useContext } from "react";

// Simple toast hook implementation
export function useToast() {
  // For now, return an empty array of toasts
  return {
    toasts: [],
    toast: () => {},
    dismiss: () => {},
  };
}