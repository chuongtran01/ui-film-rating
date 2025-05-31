"use client";

import type { DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getUsersTableColumns } from "./UsersTableColumns";
import DataTableExport from "@/components/data-table/data-table-export";
import { User } from "@/types/user";
import { DeactivateUserDialog } from "./DeactivateUserDialog";
import { PaginationResponse } from "@/interfaces/pagination";
import { UpdateUserSheet } from "./UpdateUserSheet";

interface UsersTableProps {
  data: PaginationResponse<User> | undefined;
}

export function UsersTable(props: UsersTableProps) {
  const { data } = props;

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<User> | null>(null);

  const columns = React.useMemo(
    () =>
      getUsersTableColumns({
        setRowAction,
      }),
    []
  );

  const onTaskExport = React.useCallback(() => {
    console.log("onTaskExport");
  }, []);

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: data?.content || [],
    columns,
    pageCount: data?.page.totalPages ?? 0,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
          <DataTableExport isPending={false} disabled={false} align="end" onExport={onTaskExport} tooltip="Export users data" />
        </DataTableToolbar>
      </DataTable>
      {rowAction?.row.original && <UpdateUserSheet open={rowAction?.variant === "update"} onOpenChange={() => setRowAction(null)} user={rowAction?.row.original ?? null} />}
      {rowAction?.row.original && <DeactivateUserDialog open={rowAction?.variant === "delete"} onOpenChange={() => setRowAction(null)} user={rowAction.row.original} />}
    </>
  );
}
