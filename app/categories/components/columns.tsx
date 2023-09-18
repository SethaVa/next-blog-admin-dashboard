"use client";

import React from "react";

// Libs
import { ColumnDef } from "@tanstack/react-table";

// Components
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export type CategoryColumn = {
  id: string;
  name: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-56">
        <Badge variant="secondary" className="text-muted-foreground rounded-sm">
          {row.getValue("id")}
        </Badge>
      </div>
    ),
    size: 56,
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => (
      <div className="w-[20px]">
        <Badge
          variant="secondary"
          className="text-muted-foreground rounded-sm bg-green-100"
        >
          {row?.original?.isPublished ? "Published" : "Draft"}
        </Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 32,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-56">{row.original.createdAt}</div>,
    size: 56,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-56">{row.original.updatedAt}</div>,
    size: 56,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 72,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 48,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center w-28">
        <CellAction data={row.original} />
      </div>
    ),
    size: 16,
  },
];
