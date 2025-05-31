"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Separator } from "@/components/ui/separator";
import { getValidSearchParams } from "@/lib/data-table";
import { getAllParams } from "@/lib/urlParams";
import userService from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import { UsersTable } from "@/components/admin/users/table/UsersTable";
import { searchUsersParamsCache } from "@/components/admin/users/table/validations";

const page = () => {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchUsersParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", filteredSearch],
    queryFn: () => userService.getUsers(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.users.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("admin.users.description")}</p>
      </div>
      <Separator />
      <React.Suspense fallback={<DataTableSkeleton columnCount={7} filterCount={2} cellWidths={["10rem", "30rem", "10rem", "10rem", "6rem", "6rem", "6rem"]} shrinkZero />}>
        <UsersTable data={data} />
      </React.Suspense>
    </div>
  );
};

export default page;
