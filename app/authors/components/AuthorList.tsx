"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Libs
import { Plus } from "lucide-react";

// Components
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AuthorColumn, columns } from "./Columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/data-table";

interface AuthorListProps {
  data: AuthorColumn[];
}

const AuthorList: React.FC<AuthorListProps> = ({ data }) => {
  const router = useRouter();

  const columnWithoutSelect = columns.filter((col: any) => col.id !== "select");
  return (
    <div className="bg-white h-screen flex-1 p-8 pt-6 space-y-4">
      <div className="flex justify-between items-center">
        <Heading title="Author" description="Manage authors for your post" />
        <Button onClick={() => router.push("/authors/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columnWithoutSelect} data={data} />
    </div>
  );
};

export default AuthorList;
