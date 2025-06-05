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
import { useRouter, useSearchParams } from "next/navigation";
import { searchCountriesParamsCache } from "@/components/admin/filters/countries/validation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { CreateCountrySheet } from "@/components/admin/filters/countries/CreateCountrySheet";
import { useTranslations } from "next-intl";
import { DeleteCountryDialog } from "@/components/admin/filters/countries/DeleteCountryDialog";
import { UpdateCountrySheet } from "@/components/admin/filters/countries/UpdateCountrySheet";
import { getCountriesTableColumns } from "@/components/admin/filters/countries/GenresTableColumns";
import showService from "@/services/show";
import { Show } from "@/types/show";
import { getShowsTableColumns } from "./ShowsTableColumns";
import { DeleteShowDialog } from "./DeleteShowDialog";
import CreateShowSheet from "../CreateShowSheet";

export function ShowsTable() {
  const t = useTranslations();

  const router = useRouter();

  const params = getAllParams(useSearchParams());
  const searchParams = searchCountriesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shows", filteredSearch],
    queryFn: () => showService.getShows(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Show> | null>(null);
  const [tableAction, setTableAction] = React.useState<DataTableAction | null>(null);

  const columns = React.useMemo(
    () =>
      getShowsTableColumns({
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
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
          <DataTableAddButton title={t("admin.shows.createButton")} onClick={() => setTableAction({ variant: "add" })} />
        </DataTableToolbar>
      </DataTable>
      {tableAction?.variant === "add" && <CreateShowSheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <DeleteShowDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} show={rowAction.row.original} />}
    </>
  );
}
