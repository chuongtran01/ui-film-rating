"use client";

import { useRouter } from "next/navigation";
import { getParam, setParam } from "@/lib/urlParams";

/**
 * Get the current page from the URL, defaulting to 1 if not present or invalid.
 */
export function getPage(searchParams: URLSearchParams): number {
  const page = parseInt(getParam(searchParams, "page") || "1", 10);
  return isNaN(page) || page < 1 ? 1 : page;
}

/**
 * Set the current page in the URL.
 */
export function setPage(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, page: number) {
  setParam(router, searchParams, "page", String(page));
}

/**
 * Go to the next page.
 */
export function nextPage(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams) {
  const current = getPage(searchParams);
  setPage(router, searchParams, current + 1);
}

/**
 * Go to the previous page.
 */
export function prevPage(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams) {
  const current = getPage(searchParams);
  setPage(router, searchParams, Math.max(1, current - 1));
}
