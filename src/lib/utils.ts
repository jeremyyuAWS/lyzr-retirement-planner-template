import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))