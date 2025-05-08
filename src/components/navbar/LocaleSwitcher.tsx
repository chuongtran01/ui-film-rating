import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();

  const onSelectChange = (nextLocale: Locale) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-primary border-gray-700 text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold">
          {locale.toLocaleUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary border-gray-700">
        {routing.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => onSelectChange(locale)} className="text-primary-foreground hover:bg-primary focus:bg-gray-800 focus:text-primary-foreground cursor-pointer">
            <span>{locale}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
