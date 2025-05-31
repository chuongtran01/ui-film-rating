"use client";

import type { DataTableAction, DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import { getAllParams } from "@/lib/urlParams";
import { useSearchParams } from "next/navigation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { useTranslations } from "next-intl";
import { searchStreamingPlatformsParamsCache } from "@/components/admin/filters/streaming-platform/validation";
import { getStreamingPlatformsTableColumns } from "@/components/admin/filters/streaming-platform/StreamingPlatformTableColumns";
import { UpdateStreamingPlatformSheet } from "@/components/admin/filters/streaming-platform/UpdateStreamingPlatformSheet";
import { CreateStreamingPlatformSheet } from "@/components/admin/filters/streaming-platform/CreateStreamingPlatformSheet";
import { DeleteStreamingPlatformDialog } from "@/components/admin/filters/streaming-platform/DeleteStreamingPlatformDialog";

export function StreamingPlatformsTable() {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchStreamingPlatformsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["streaming-platforms", filteredSearch],
    queryFn: () => filterService.getStreamingPlatforms(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Country> | null>(null);
  const [tableAction, setTableAction] = React.useState<DataTableAction | null>(null);

  const columns = React.useMemo(
    () =>
      getStreamingPlatformsTableColumns({
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
          <DataTableAddButton title={t("admin.filters.tabs.streaming-platforms.createButton")} onClick={() => setTableAction({ variant: "add" })} />
        </DataTableToolbar>
      </DataTable>
      {tableAction?.variant === "add" && <CreateStreamingPlatformSheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <UpdateStreamingPlatformSheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} streamingPlatform={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeleteStreamingPlatformDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} streamingPlatform={rowAction.row.original} />}
    </>
  );
}
