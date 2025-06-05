"use client";

import type { DataTableRowAction } from "@/types/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Mail } from "lucide-react";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Show } from "@/types/show";

interface GetShowsTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Show> | null>>;
}

export function getShowsTableColumns({ setRowAction }: GetShowsTableColumnsProps): ColumnDef<Show>[] {
  return [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => <div className="w-20">{String(row.getValue("title"))}</div>,
      meta: {
        label: "Title",
        variant: "popoverText",
        placeholder: "Search titles...",
      },
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("name"))}</div>,
      meta: {
        label: "Name",
        variant: "popoverText",
        placeholder: "Search names...",
        icon: Mail,
      },
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "releaseDate",
      accessorKey: "releaseDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Release Date" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("releaseDate"))}</div>,
      enableHiding: true,
      enableSorting: true,
    },
    {
      id: "duration",
      accessorKey: "duration",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("duration"))}</div>,
      enableSorting: true,
    },
    {
      id: "rating",
      accessorKey: "rating",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("rating"))}</div>,
      enableSorting: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("status"))}</div>,
      enableSorting: true,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Open menu" variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: "update" })}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: "delete" })}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
