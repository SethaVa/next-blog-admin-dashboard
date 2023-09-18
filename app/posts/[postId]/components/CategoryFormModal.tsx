"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Libs
import axios from "axios";
import { toast } from "react-hot-toast";

// Components
import CategoryForm, {
  CategoryFormValues,
} from "@/app/categories/[categoryId]/components/Form";
import DocumentInfo from "@/components/DocumentInfo";
import FormModal from "@/components/modals/form-modal";

interface CategoryFormModalProps {
  isOpen: boolean;
  selectedCategory: String[];
  onClose: () => void;
  setCategories: (value: any) => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  selectedCategory,
  onClose,
  setCategories,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toastMessage = "Category created.";
  const router = useRouter();

  if (!isOpen) return null;

  const onSave = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      const createdCategory = await axios.post(`/api/categories`, data);
      setCategories(
        selectedCategory
          ? selectedCategory.concat([createdCategory.data.id])
          : [createdCategory.data.id]
      );
      toast.success(toastMessage);
      onClose();

      // Refreshing Server-Side Props
      router.refresh();
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveAndPublish = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      const saveData = {
        ...data,
        isPublished: true,
      };

      const createdCategory = await axios.post(`/api/categories`, saveData);
      setCategories(
        selectedCategory
          ? selectedCategory.concat([createdCategory.data.id])
          : [createdCategory.data.id]
      );
      toast.success(toastMessage);
      onClose();
      // Refreshing Server-Side Props
      router.refresh();
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      title="Add Categories"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
    >
      <div className="flex flex-row gap-2">
        <div className="flex-1 pt-4">
          <CategoryForm
            isLoading={isLoading}
            initialData={null}
            onSave={onSave}
            onSaveAndPublish={onSaveAndPublish}
          />
        </div>
        <div className=" w-96 pt-4 p-6 bg-slate-50 h-full">
          <DocumentInfo />
        </div>
      </div>
    </FormModal>
  );
};

export default CategoryFormModal;
