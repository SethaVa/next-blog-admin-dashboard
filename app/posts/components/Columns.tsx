"use client";

import React from "react";

// Libs
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

import { Check } from "lucide-react";
import ButtonShowContentModal from "./ButtonShowContent";
import ButtonShowExcerptModal from "./ButtonShowExcerpt";
import ButtonPreviewFeaturedImage from "../../../components/buttons/ButtonPreviewFeaturedImage";
import ButtonShowCategoryList from "./ButtonShowCategoryList";
import { OutputData } from "@editorjs/editorjs";

export type PostColumn = {
  id: string;
  title: string;
  slug: string;
  excerpt: OutputData;
  content: OutputData;
  createdAt: string;
  isPublished: boolean;
  featuredImage: string;
  isFeaturedPost: boolean;
  categoryNumber: number;
  author: any;
  categories: any;
};

export const columns: ColumnDef<PostColumn>[] = [
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
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   cell: ({ row }) => (
  //     <div>
  //       <Badge variant="secondary" className="text-muted-foreground rounded-sm">
  //         {row.getValue("id")}
  //       </Badge>
  //     </div>
  //   ),
  //   size: 72,
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   cell: ({ row }) => (
  //     <div className="w-[150px]">{row.getValue("createdAt")}</div>
  //   ),
  //   size: 32,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("title")}</div>,
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
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("slug")}</div>,
    size: 48,
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Excerpt" />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="w-20 flex items-center justify-center">
        <ButtonShowExcerptModal data={row.original} />
      </div>
    ),
    size: 48,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Content" />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="w-20 flex items-center justify-center">
        <ButtonShowContentModal data={row.original} />
      </div>
    ),
    size: 48,
  },
  {
    accessorKey: "featuredImage",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Featured Image" />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="w-36 flex items-center justify-center">
        <ButtonPreviewFeaturedImage
          featuredImage={row.original.featuredImage}
        />
      </div>
    ),
    size: 48,
  },
  {
    accessorKey: "isFeaturedPost",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Featured Post" />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="w-36 flex items-center justify-center">
        <Check />
      </div>
    ),

    size: 48,
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="w-32">{row.original.author}</div>,
    size: 48,
  },
  {
    accessorKey: "categoryNumber",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Categories" />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ButtonShowCategoryList data={row.original} />
      </div>
    ),
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
