import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "vi"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/auth": "/auth",
    "/profile/watchlist": "/profile/watchlist",
    "/profile/account": "/profile/account",
    "/profile/password": "/profile/password",
    "/profile/reviews": "/profile/reviews",
    "/movies": "/movies",
    "/series": "/series",
    "/show/[id]": "/show/[id]",
    "/show/[id]/reviews": "/show/[id]/reviews",
    "/admin": "/admin",
    "/admin/shows": "/admin/shows",
    "/admin/users": "/admin/users",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
