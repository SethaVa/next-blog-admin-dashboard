"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Libs
import { z } from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

// Components
import AuthorForm from "./AuthorForm";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DocumentInfo from "@/components/DocumentInfo";

interface AuthorFormProps {
  initialData: any | null;
  loading?: boolean;
}

const formSchema = z.object({
  name: z.string().min(2),
  photo: z.string().min(2),
  bio: z.string().min(2),
  isPublished: z.boolean(),
});

export type AuthorFormValues = z.infer<typeof formSchema>;

const AuthorFormWidget: React.FC<AuthorFormProps> = ({
  initialData,
  loading = false,
}) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(loading);

  const toastMessage = initialData ? "Author updated." : "Author created.";

  const onSave = async (data: AuthorFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        // Edit category
        await axios.patch(`/api/authors/${initialData.id}`, data);
      } else {
        // Create new category
        await axios.post(`/api/authors`, data);
      }
      router.refresh();
      router.push("/authors");
      toast.success(toastMessage);
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveAndPublish = async (data: AuthorFormValues) => {
    try {
      setIsLoading(true);
      const saveData = {
        ...data,
        isPublished: true,
      };
      if (initialData) {
        // Edit category
        await axios.patch(`/api/authors/${initialData.id}`, saveData);
      } else {
        // Create new category
        await axios.post(`/api/authors`, saveData);
      }
      router.refresh();
      router.push("/authors");
      toast.success(toastMessage);
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/authors/${params.categoryId}`);
      router.refresh();
      router.push("/authors");
      toast.success("Author deleted.");
    } catch (error) {
      console.log("Make sure you removed all posts using this author first.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-row gap-4 h-full">
      <div className="flex-1 pt-4">
        <AuthorForm
          isLoading={isLoading}
          initialData={initialData}
          onSave={onSave}
          onSaveAndPublish={onSaveAndPublish}
        />
      </div>
      <div className=" w-96 pt-4 p-6 bg-slate-50 h-full">
        <DocumentInfo
          entryId={initialData ? initialData.id : ""}
          createdAt={initialData ? initialData.createdAt : ""}
          updatedAt={initialData ? initialData.updatedAt : ""}
          isPublished={initialData ? initialData.isPublished : ""}
        />
      </div>
    </div>
  );
};

export default AuthorFormWidget;
