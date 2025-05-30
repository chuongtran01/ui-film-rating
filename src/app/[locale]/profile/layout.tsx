import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/common/SidebarNav";

export const metadata: Metadata = {
  title: "My Profile",
  description: "My profile page.",
};

const sidebarNavItems = [
  {
    title: "Ratings & Reviews",
    href: "/profile/reviews",
  },
  {
    title: "Watchlist",
    href: "/profile/watchlist",
  },
  {
    title: "My Account",
    href: "/profile/account",
  },
  {
    title: "Password",
    href: "/profile/password",
  },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="container mx-auto">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} title="My Profile" />
          </aside>
          <div className="flex-1 lg:w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
