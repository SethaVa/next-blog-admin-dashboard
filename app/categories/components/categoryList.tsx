"use client";

import { useRouter } from "next/navigation";
import React from "react";

// Libs
import { Plus } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/table/data-table";

interface CategorListProps {
  data: CategoryColumn[];
}

const CategoryList: React.FC<CategorListProps> = ({ data }) => {
  const router = useRouter();

  const columnWithoutSelect = columns.filter((col: any) => col.id !== "select");

  return (
    <div className="bg-white h-screen flex-1 p-8 pt-6 space-y-4">
      <div className="flex justify-between items-center">
        <Heading
          title="Category"
          description="Manage categories for your post"
        />
        <Button onClick={() => router.push("/categories/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columnWithoutSelect} data={data} />
    </div>
  );
};

export default CategoryList;
