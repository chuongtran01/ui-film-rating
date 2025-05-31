import { Metadata } from "next";
import { SidebarNav } from "@/components/common/SidebarNav";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for Cinecritique.",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const t = useTranslations();

  const sidebarNavItems = [
    {
      title: t("admin.shows.sidebar"),
      href: "/admin/shows",
    },
    {
      title: t("admin.users.sidebar"),
      href: "/admin/users",
    },
    {
      title: t("admin.filters.sidebar"),
      href: "/admin/filters",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} title="Admin" />
          </aside>
          <div className="flex-1 lg:w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
