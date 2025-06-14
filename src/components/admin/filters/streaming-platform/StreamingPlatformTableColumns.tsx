"use client";

import type { DataTableRowAction } from "@/types/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Mail } from "lucide-react";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import formatterService from "@/services/formatter";
import { StreamingPlatform } from "@/types/streaming-platform";

interface GetStreamingPlatformsTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<StreamingPlatform> | null>>;
}

export function getStreamingPlatformsTableColumns({ setRowAction }: GetStreamingPlatformsTableColumnsProps): ColumnDef<StreamingPlatform>[] {
  return [
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
      cell: ({ row }) => <div className="w-20">{String(row.getValue("code"))}</div>,
      meta: {
        label: "Code",
        variant: "popoverText",
        placeholder: "Search codes...",
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
      id: "logo",
      accessorKey: "logo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Logo" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("logo"))}</div>,
      enableHiding: true,
    },
    {
      id: "url",
      accessorKey: "url",
      header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("url"))}</div>,
      enableHiding: true,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At (UTC)" />,
      cell: ({ cell }) => formatterService.formatDateTimeUTC(cell.getValue<Date>()),
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At (UTC)" />,
      cell: ({ cell }) => formatterService.formatDateTimeUTC(cell.getValue<Date>()),
      enableSorting: false,
      enableHiding: true,
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
