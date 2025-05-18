"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, stripLocale } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, title, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-4 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      <Label className="text-2xl font-bold tracking-tight">{title}</Label>
      <Separator className="my-6" />
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(buttonVariants({ variant: "ghost" }), stripLocale(pathname) === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline", "justify-start")}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
