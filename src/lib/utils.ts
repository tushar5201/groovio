import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = "https://groovio.vercel.app/api";
export const imageUrl = "https://image.tmdb.org/t/p/original";