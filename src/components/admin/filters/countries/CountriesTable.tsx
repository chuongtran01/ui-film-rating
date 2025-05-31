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
import { searchCountriesParamsCache } from "@/components/admin/filters/countries/validation";
import { getValidSearchParams } from "@/lib/data-table";
import filterService from "@/services/filter";
import DataTableAddButton from "@/components/data-table/data-table-add-button";
import { CreateCountrySheet } from "@/components/admin/filters/countries/CreateCountrySheet";
import { useTranslations } from "next-intl";
import { DeleteCountryDialog } from "@/components/admin/filters/countries/DeleteCountryDialog";
import { UpdateCountrySheet } from "@/components/admin/filters/countries/UpdateCountrySheet";
import { getCountriesTableColumns } from "@/components/admin/filters/countries/GenresTableColumns";

export function CountriesTable() {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchCountriesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["countries", filteredSearch],
    queryFn: () => filterService.getCountries(filteredSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Country> | null>(null);
  const [tableAction, setTableAction] = React.useState<DataTableAction | null>(null);

  const columns = React.useMemo(
    () =>
      getCountriesTableColumns({
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
          <DataTableAddButton title={t("admin.filters.tabs.countries.createButton")} onClick={() => setTableAction({ variant: "add" })} />
        </DataTableToolbar>
      </DataTable>
      {tableAction?.variant === "add" && <CreateCountrySheet open={tableAction?.variant === "add"} onOpenChange={() => setTableAction(null)} />}
      {rowAction?.row.original && <UpdateCountrySheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} country={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeleteCountryDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} country={rowAction.row.original} />}
    </>
  );
}
