"use client";

import type { DataTableRowAction } from "@/types/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { CalendarIcon, CheckCircle, Ellipsis, Mail, User as UserIcon } from "lucide-react";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserGender } from "@/enums/UserGender";
import { UserRole } from "@/enums/UserRole";
import formatterService from "@/services/formatter";
import { User } from "@/types/user";
import { Genre } from "@/types/genre";
import { Country } from "@/types/country";

interface GetCountriesTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Country> | null>>;
}

export function getCountriesTableColumns({ setRowAction }: GetCountriesTableColumnsProps): ColumnDef<Country>[] {
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
      id: "flag",
      accessorKey: "flag",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Flag" />,
      cell: ({ row }) => <div className="w-30">{String(row.getValue("flag"))}</div>,
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
