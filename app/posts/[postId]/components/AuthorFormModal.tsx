"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Libs
import axios from "axios";
import { toast } from "react-hot-toast";

// Components
import AuthorForm, {
  AuthorFormValues,
} from "@/app/authors/[authorId]/components/AuthorForm";
import DocumentInfo from "@/components/DocumentInfo";
import FormModal from "@/components/modals/form-modal";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  setAuthor: (value: any) => void;
}

const AuthorFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  setAuthor,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toastMessage = "Author created.";
  const router = useRouter();

  if (!isOpen) return null;

  const onSave = async (data: AuthorFormValues) => {
    try {
      setIsLoading(true);
      const createdAuthor = await axios.post(`/api/authors`, data);
      setAuthor(createdAuthor.data.id);
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

  const onSaveAndPublish = async (data: AuthorFormValues) => {
    try {
      setIsLoading(true);
      const saveData = {
        ...data,
        isPublished: true,
      };
      const createdAuthor = await axios.post(`/api/authors`, saveData);
      setAuthor(createdAuthor.data.id);
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
      title="Add Author"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
    >
      <div className="flex flex-row gap-2">
        <div className="flex-1 pt-4">
          <AuthorForm
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

export default AuthorFormModal;
