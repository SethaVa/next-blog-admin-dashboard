"use client";

// Libs
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import TextInputFormItem from "@/components/form/TextInputFormItem";

interface AuthorFormProps {
  isLoading: boolean;
  initialData: any | null;
  onSave: (data: AuthorFormValues) => Promise<void>;
  onSaveAndPublish: (data: AuthorFormValues) => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(2),
  photo: z.string().min(2),
  bio: z.string().min(2),
  isPublished: z.boolean(),
});

export type AuthorFormValues = z.infer<typeof formSchema>;

const AuthorForm: React.FC<AuthorFormProps> = ({
  initialData,
  isLoading,
  onSave,
  onSaveAndPublish,
}) => {
  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      photo: "",
      bio: "",
      isPublished: false,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <TextInputFormItem
                isUnique={true}
                isRequired={true}
                label="Name"
                disabled={isLoading}
                placeholder="Author name"
                value={field.value || ""}
                onChange={(value) => field.onChange(value)}
                onRemove={() => field.onChange("")}
              />
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <TextInputFormItem
                isUnique={true}
                isRequired={true}
                label="Bio"
                disabled={isLoading}
                placeholder="Example: react-dev"
                value={field.value || ""}
                onChange={(value) => field.onChange(value)}
                onRemove={() => field.onChange("")}
              />
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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

export default AuthorForm;
