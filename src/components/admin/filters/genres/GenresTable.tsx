"use client";

import type { DataTableAction, DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getGenresTableColumns } from "@/components/admin/filters/genres/GenresTableColumns";
import { Genre } from "@/types/genre";
import { UpdateGenreSheet } from "./UpdateGenreSheet";
import { DeleteGenreDialog } from "./DeleteGenreDialog";
import { useQuery } from "@tanstack/react-query";
import { getAllParams } from "@/lib/urlParams";
import { useSearchParams } from "next/navigation";
import { searchGenresParamsCache } from "./validation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { CreateGenreSheet } from "./CreateGenreSheet";
import { useTranslations } from "next-intl";

export function GenresTable() {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchGenresParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["genres", filteredSearch],
    queryFn: () => filterService.getGenres(filteredSearch),
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

  const { table } = useDataTable({
    data: data?.content || [],
    columns,
    pageCount: data?.page?.totalPages ?? 0,
    getRowId: (originalRow) => String(originalRow.id),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
          <DataTableAddButton title={t("admin.filters.tabs.genres.createButton")} onClick={() => setTableAction({ variant: "add" })} />
        </DataTableToolbar>
      </DataTable>
      {tableAction?.variant === "add" && <CreateGenreSheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <UpdateGenreSheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} genre={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeleteGenreDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} genre={rowAction.row.original} />}
    </>
  );
}
