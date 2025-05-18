import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips the locale from the pathname.
 * @param pathname - The pathname to strip the locale from.
 * @returns The pathname without the locale.
 */
export const stripLocale = (pathname: string) => {
  // Assumes locale is always the first segment, e.g. /en/...
  const parts = pathname.split("/");
  if (parts[1] && parts[1].length === 2) {
    // Remove the locale part
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
};
