"use client";

import React from "react";

// Libs
import { Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import { CategoryColumn } from "@/app/categories/components/columns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryCardProps {
  data: CategoryColumn;
  onRemove?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data, onRemove }) => {
  return (
    <Card className="w-full my-1">
      <CardContent className="px-4 py-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="text-muted-foreground rounded-sm"
            >
              Category
            </Badge>
            <p>{data?.name}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="seccess">
              {data?.isPublished ? "Published" : "Draft"}
            </Badge>
            {onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4 hover:bg-slate-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => console.log("Edit")}>
                    <Edit className="w-5 h-5 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onRemove}>
                    <Trash className="w-5 h-5 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
