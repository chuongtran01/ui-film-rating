import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "vi"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/login": "/login",
    "/create-account": "/create-account",
    "/profile/[id]": "/profile/[id]",
    "/profile/[id]/watchlist": "/profile/[id]/watchlist",
    "/settings": "/settings",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
