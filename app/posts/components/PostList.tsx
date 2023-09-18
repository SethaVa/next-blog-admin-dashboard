"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Libs
import { Plus } from "lucide-react";

// Components
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { PostColumn, columns } from "./Columns";
import { DataTable } from "@/components/table/data-table";

interface PostListProps {
  data: PostColumn[];
}

const PostList: React.FC<PostListProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="bg-white h-full flex-1 p-8 pt-6 space-y-4">
      <div className="flex justify-between items-center">
        <Heading title="Post" description="Manage posts for your blog" />
        <Button onClick={() => router.push("/posts/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PostList;
