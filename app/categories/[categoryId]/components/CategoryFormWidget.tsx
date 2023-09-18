"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Libs
import { toast } from "react-hot-toast";
import axios from "axios";

// Components
import DocumentInfo from "@/components/DocumentInfo";
import CategoryForm, { CategoryFormValues } from "./Form";

interface CategoryFormProps {
  initialData: any | null;
  loading?: boolean;
}
const CategoryFormWidget: React.FC<CategoryFormProps> = ({
  initialData,
  loading = false,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(loading);

  const toastMessage = initialData ? "Category updated." : "Category created.";

  const onSave = async (data: CategoryFormValues) => {
    const tmp = await axios.get(`/api/categories/front`);
    console.log(tmp);
    // try {
    //   setIsLoading(true);
    //   if (initialData) {
    //     // Edit category
    //     await axios.patch(`/api/categories/${initialData.id}`, data);
    //   } else {
    //     // Create new category
    //     await axios.post(`/api/categories`, data);
    //   }
    //   router.refresh();
    //   router.push("/categories");
    //   toast.success(toastMessage);
    // } catch (error) {
    //   console.log("Something went wrong.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const onSaveAndPublish = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);

      const saveData = {
        ...data,
        isPublished: true,
      };

      if (initialData) {
        // Edit category
        await axios.patch(`/api/categories/${initialData.id}`, data);
      } else {
        // Create new category
        await axios.post(`/api/categories`, data);
      }
      router.refresh();
      router.push("/categories");
      toast.success(toastMessage);
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-full gap-2">
      <div className="flex-1 pt-4">
        <CategoryForm
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

export default CategoryFormWidget;
