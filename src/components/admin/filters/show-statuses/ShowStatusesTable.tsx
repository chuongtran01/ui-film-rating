"use client";

import type { DataTableAction, DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getGenresTableColumns } from "@/components/admin/filters/genres/GenresTableColumns";
import { Genre } from "@/types/genre";
import { UpdateShowStatusSheet } from "@/components/admin/filters/show-statuses/UpdateShowStatusSheet";
import { DeleteShowStatusDialog } from "@/components/admin/filters/show-statuses/DeleteShowStatusDialog";
import { useQuery } from "@tanstack/react-query";
import { getAllParams } from "@/lib/urlParams";
import { useSearchParams } from "next/navigation";
import { searchShowStatusesParamsCache } from "@/components/admin/filters/show-statuses/validation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { CreateShowStatusSheet } from "@/components/admin/filters/show-statuses/CreateShowStatusSheet";
import { useTranslations } from "next-intl";

export function ShowStatusesTable() {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchShowStatusesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["show-statuses", filteredSearch],
    queryFn: () => filterService.getShowStatuses(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Genre> | null>(null);
  const [tableAction, setTableAction] = React.useState<DataTableAction | null>(null);

  const columns = React.useMemo(
    () =>
      getGenresTableColumns({
        setRowAction,
      }),
    []
  );

  const onTaskExport = React.useCallback(() => {
    console.log("onTaskExport");
  }, []);

  const { table } = useDataTable({
    data: data?.content || [],
    columns,
    pageCount: data?.page?.totalPages ?? 0,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
          <DataTableAddButton title={t("admin.filters.tabs.show-statuses.createButton")} onClick={() => setTableAction({ variant: "add" })} />
        </DataTableToolbar>
      </DataTable>
      {tableAction?.variant === "add" && <CreateShowStatusSheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <UpdateShowStatusSheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} showStatus={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeleteShowStatusDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} showStatus={rowAction.row.original} />}
    </>
  );
}
