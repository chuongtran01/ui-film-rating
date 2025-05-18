"use client";

import { useRouter } from "next/navigation";

/**
 * Get a query param value from the current URL.
 */
export function getParam(searchParams: URLSearchParams, key: string): string | null {
  return searchParams.get(key);
}

/**
 * Get all query params from the current URL as an object.
 */
export function getAllParams(searchParams: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Set a query param value in the URL (shallow routing, no reload).
 */
export function setParam(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  router.replace(`?${params.toString()}`, { scroll: false });
}

/**
 * Set multiple query params in the URL (shallow routing, no reload).
 */
export function setParams(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, newParams: Record<string, string>) {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(newParams).forEach(([key, value]) => {
    params.set(key, value);
  });
  router.replace(`?${params.toString()}`, { scroll: false });
}

/**
 * Remove a query param from the URL (shallow routing, no reload).
 */
export function removeParam(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, key: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(key);
  router.replace(`?${params.toString()}`, { scroll: false });
}

/**
 * Remove multiple query params from the URL (shallow routing, no reload).
 */
export function removeParams(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, keys: string[]) {
  const params = new URLSearchParams(searchParams.toString());
  keys.forEach((key) => params.delete(key));
  router.replace(`?${params.toString()}`, { scroll: false });
}
