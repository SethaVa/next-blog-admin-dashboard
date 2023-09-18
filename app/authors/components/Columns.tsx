"use client";

import React from "react";

// Libs
import { ColumnDef } from "@tanstack/react-table";
import { BsLink } from "react-icons/bs";

// Components
import { CellAction } from "./CellAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import ButtonViewBio from "./ButtonViewBio";
import ButtonPreviewFeaturedImage from "@/components/buttons/ButtonPreviewFeaturedImage";

export type AuthorColumn = {
  id: string;
  name: string;
  photo: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
};

export const columns: ColumnDef<AuthorColumn>[] = [
  {
    id: "select",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row, table }) => (
      <Button
        type="button"
        className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2"
        onClick={(value) => {
          table.resetRowSelection();
          row.toggleSelected(!!value);
        }}
      >
        <BsLink className="w-5 h-5" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 16,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-muted-foreground rounded-sm">
        {row.getValue("id")}
      </Badge>
    ),
    size: 40,
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="text-muted-foreground rounded-sm bg-green-100"
      >
        {row?.original?.isPublished ? "Published" : "Draft"}
      </Badge>
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
    cell: ({ row }) => <div className="w-52">{row.original.createdAt}</div>,
    size: 32,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-52">{row.original.updatedAt}</div>,
    size: 32,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-40">{row.original.name}</div>,
    size: 32,
  },
  {
    accessorKey: "photo",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Photo" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ButtonPreviewFeaturedImage featuredImage={row.original.photo} />
      </div>
    ),
    size: 32,
  },
  {
    accessorKey: "bio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bio" />
    ),
    cell: ({ row }) => <ButtonViewBio data={row.original} />,
    size: 16,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    ),
    size: 16,
  },
];
