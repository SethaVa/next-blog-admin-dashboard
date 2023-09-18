"use client";

import React from "react";

// Libs
import { Loader2 } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./components/Columns";

const Loading = () => {
  return (
    <div className="bg-white h-screen flex-1 p-8 pt-6 space-y-4">
      <div className="flex justify-between items-center">
        <Heading title="Post" description="Manage posts for your blog" />
        <Button disabled className="cursor-not-allowed opacity-50">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={[]} loading={true} />
    </div>
  );
};

export default Loading;
