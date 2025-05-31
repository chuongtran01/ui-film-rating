"use client";

import type { DataTableAction, DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getGenresTableColumns } from "@/components/admin/filters/genres/GenresTableColumns";
import { useQuery } from "@tanstack/react-query";
import { getAllParams } from "@/lib/urlParams";
import { useSearchParams } from "next/navigation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { useTranslations } from "next-intl";
import { searchLanguagesParamsCache } from "./validation";
import { Language } from "@/types/language";
import { UpdateLanguageSheet } from "@/components/admin/filters/languages/UpdateLanguageSheet";
import { CreateLanguageSheet } from "@/components/admin/filters/languages/CreateLanguageSheet";
import { DeleteLanguageDialog } from "@/components/admin/filters/languages/DeleteLanguageDialog";

export function LanguagesTable() {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchLanguagesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["languages", filteredSearch],
    queryFn: () => filterService.getLanguages(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Language> | null>(null);
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
      {tableAction?.variant === "add" && <CreateLanguageSheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <UpdateLanguageSheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} language={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeleteLanguageDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} language={rowAction.row.original} />}
    </>
  );
}
