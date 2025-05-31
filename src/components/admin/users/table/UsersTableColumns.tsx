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

interface GetUsersTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<User> | null>>;
}

export function getUsersTableColumns({ setRowAction }: GetUsersTableColumnsProps): ColumnDef<User>[] {
  return [
    {
      id: "displayName",
      accessorKey: "displayName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Display Name" />,
      cell: ({ row }) => {
        const displayName = row.getValue("displayName");
        if (!displayName) return <Badge variant="outline">UNDEFINED</Badge>;
        return <div className="w-20">{String(displayName)}</div>;
      },
      meta: {
        label: "Display Name",
        variant: "popoverText",
        placeholder: "Search display names...",
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => {
        const email = row.getValue("email");
        if (!email) return <Badge variant="outline">UNDEFINED</Badge>;
        return <div className="w-30">{String(email)}</div>;
      },
      meta: {
        label: "Email",
        variant: "popoverText",
        placeholder: "Search emails...",
        icon: Mail,
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => {
        const role = row.getValue("role");
        if (!role) return <Badge variant="outline">UNDEFINED</Badge>;
        return <div className="w-20">{String(role)}</div>;
      },
      meta: {
        label: "Role",
        variant: "multiSelect",
        options: Object.values(UserRole).map((role) => ({
          label: role.charAt(0).toUpperCase() + role.slice(1),
          value: role,
        })),
        icon: UserIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "gender",
      accessorKey: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
      cell: ({ row }) => {
        const gender = row.getValue("gender");
        if (!gender) return <Badge variant="outline">UNDEFINED</Badge>;
        return <div className="w-20">{String(gender)}</div>;
      },
      meta: {
        label: "Gender",
        variant: "multiSelect",
        options: Object.values(UserGender).map((gender) => ({
          label: gender.charAt(0).toUpperCase() + gender.slice(1),
          value: gender,
        })),
        icon: UserIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "dob",
      accessorKey: "dob",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date of Birth" />,
      cell: ({ row }) => {
        const dob = row.getValue("dob");
        if (!dob) return <Badge variant="outline">UNDEFINED</Badge>;
        return <div className="w-20">{String(dob)}</div>;
      },
      meta: {
        label: "Date of Birth",
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At (UTC)" />,
      cell: ({ cell }) => formatterService.formatDateTimeUTC(cell.getValue<Date>()),
      meta: {
        label: "Created At",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At (UTC)" />,
      cell: ({ cell }) => formatterService.formatDateTimeUTC(cell.getValue<Date>()),
      meta: {
        label: "Updated At",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "active",
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
      cell: ({ row }) => {
        const active = row.getValue("active");
        return <div className="w-20">{active === true ? <Badge>Active</Badge> : <Badge variant="outline">Inactive</Badge>}</div>;
      },
      meta: {
        label: "Active",
        variant: "select",
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ],
        icon: CheckCircle,
      },
      enableColumnFilter: true,
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
              <DropdownMenuItem onSelect={() => setRowAction({ row, variant: "delete" })}>Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
