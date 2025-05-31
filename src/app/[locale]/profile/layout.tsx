import { Metadata } from "next";
import { SidebarNav } from "@/components/common/SidebarNav";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "My Profile",
  description: "My profile page.",
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const t = useTranslations();

  const sidebarNavItems = [
    {
      title: t("myProfile.ratingsAndReviews.sidebar"),
      href: "/profile/reviews",
    },
    {
      title: t("myProfile.watchlist.sidebar"),
      href: "/profile/watchlist",
    },
    {
      title: t("myProfile.myAccount.sidebar"),
      href: "/profile/account",
    },
    {
      title: t("myProfile.password.sidebar"),
      href: "/profile/password",
    },
  ];

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
