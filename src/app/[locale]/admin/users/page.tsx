"use client";

import AdminUsersAdmin from "@/components/admin/users/AdminUsersAdmin";
import AdminUsersModerator from "@/components/admin/users/AdminUsersModerator";
import AdminUsersUser from "@/components/admin/users/AdminUsersUser";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getParam, setParam } from "@/lib/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const tabs = [
  {
    label: "User",
    value: "user",
    component: <AdminUsersUser />,
  },
  {
    label: "Admin",
    value: "admin",
    component: <AdminUsersAdmin />,
  },
  {
    label: "Moderator",
    value: "moderator",
    component: <AdminUsersModerator />,
  },
];

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = getParam(searchParams, "tab") || "user";

  const handleTabChange = useCallback(
    (value: string) => {
      setParam(router, searchParams, "tab", value);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Users</h3>
        <p className="text-sm text-muted-foreground">Manage the users.</p>
      </div>
      <Separator />
      <Tabs value={tab} onValueChange={handleTabChange} className="w-fit">
        <TabsList className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab}>{tabs.find((t) => t.value === tab)?.component}</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
