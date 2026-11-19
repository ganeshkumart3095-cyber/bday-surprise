import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a public asset path against the app's base URL (e.g. for GitHub Pages).
 */
export function assetUrl(path: string): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  const base = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${cleanPath}`;
}
