"use client";

// Libs
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import TextInputFormItem from "@/components/form/TextInputFormItem";

const formSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  isPublished: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  isLoading: boolean;
  initialData: any | null;
  onSave: (data: CategoryFormValues) => Promise<void>;
  onSaveAndPublish: (data: CategoryFormValues) => Promise<void>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isLoading,
  initialData,
  onSave,
  onSaveAndPublish,
}) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      isPublished: false,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8 w-full ">
        <div className="md:grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <TextInputFormItem
                isUnique={true}
                isRequired={true}
                label="Name"
                value={field.value || ""}
                placeholder="Category name"
                disabled={isLoading}
                onChange={(value) => field.onChange(value)}
                onRemove={() => field.onChange("")}
              />
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <TextInputFormItem
                isUnique={true}
                isRequired={true}
                label="Slug"
                value={field.value || ""}
                placeholder="Example: react-testing..."
                disabled={isLoading}
                onChange={(value) => field.onChange(value)}
                onRemove={() => field.onChange("")}
              />
            )}
          />
        </div>
        <div className="flex items-start gap-2">
          <Button
            className=" bg-indigo-500 hover:bg-indigo-600"
            disabled={isLoading}
            onClick={form.handleSubmit(onSave)}
          >
            Save
          </Button>
          <Button
            className=" bg-green-700 hover:bg-green-800"
            disabled={isLoading}
            onClick={form.handleSubmit(onSaveAndPublish)}
          >
            Save & Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
