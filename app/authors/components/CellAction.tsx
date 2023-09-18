"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Libs
import axios from "axios";
import { toast } from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import { AuthorColumn } from "./Columns";
import AlertModal from "@/components/modals/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: AuthorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyId = (authorId: string) => {
    navigator.clipboard.writeText(authorId);
    toast.success("Author ID copied to clipboard.");
  };

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/authors/${data.id}`);
      toast.success("Author deleted.");
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_AUTHOR]", error);
      toast.error("Make sure you removed all posts using this author first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => copyId(data.id)}>
            <Copy className="w-4 h-4 mr-2" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/authors/${data.id}`)}>
            <Edit className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
