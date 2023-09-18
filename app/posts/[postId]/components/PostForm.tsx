"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, Trash } from "lucide-react";
import { BsLink } from "react-icons/bs";
import { RowSelectionState } from "@tanstack/react-table";
import { CldImage } from "next-cloudinary";

// Components
import GalleryModal from "@/components/modals/gallery-modal";
import UploadButton from "@/components/ui/UploadButton";
import { AuthorColumn } from "@/app/authors/components/Columns";
import TextInputFormItem from "@/components/form/TextInputFormItem";
import RadioGroupFormItem from "@/components/form/RadioGroupFormItem";
import SelectionFormItem from "@/components/form/SelectionFromItem";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { CategoryColumn } from "@/app/categories/components/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Local components
import CategoryCard from "../../../../components/card/CategoryCard";
import AuthorModal from "./AuthorModal";
import AuthorCard from "../../../../components/card/AuthorCard";
import CategoryModal from "./CategoryModal";
import CategoryFormModal from "./CategoryFormModal";
import AuthorFormModal from "./AuthorFormModal";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import EditorTextParser from "@/components/editor-parser/EditorTextParser";

const Editor = dynamic(() => import("../../../../components/editor/editor"), {
  ssr: false,
});

interface PostFormProps {
  initialData: any | null;
  categories: any | null;
  authors: any | null;
  resources: any | null;
  loading?: boolean;
}

const formSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.any(),
  content: z.any(),
  featuredImage: z.object({
    url: z.string(),
  }),
  isFeaturePost: z.any(),
  categoryIds: z.any(),
  authorId: z.string(),
});

const featuredPostOptions = [
  { id: "Option-1", value: true, label: "True" },
  { id: "Option-2", value: false, label: "False" },
];

type PostFormValues = z.infer<typeof formSchema>;

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  categories,
  authors,
  resources,
  loading = false,
}) => {
  const params = useParams();
  const router = useRouter();

  const initialSelectedAuthor = initialData
    ? authors.find((x: AuthorColumn) => x.id === initialData.authorId)
    : null;
  const initialSelectedCategories = initialData
    ? categories.filter((x: CategoryColumn) =>
        initialData.categoryIds.includes(x.id)
      )
    : [];

  // Modal
  const [isLoading, setIsLoading] = useState(loading);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenAuthorModal, setIsOpenAuthorModal] = useState(false);
  const [isOpenCategoryFormModal, setIsOpenCategoryFormModal] = useState(false);
  const [isOpenAuthorFormModal, setIsOpenAuthorFormModal] = useState(false);
  const [isOpenGalleryModal, setIsOpenGalleryModal] = useState(false);

  const [selectedAuthor, setSelectedAuthor] = useState<
    AuthorColumn | undefined
  >(initialSelectedAuthor);

  const [selectedCategories, setSelectedCategories] = useState<
    CategoryColumn[]
  >(initialSelectedCategories);

  const [selectedCategoryRows, setSelectedCategoryRows] =
    useState<RowSelectionState>({});

  const action = initialData ? "Save changes" : "Create";
  const toastMessage = initialData ? "Post updated." : "Post created.";

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      featuredImage: null,
      isFeaturePost: "",
      authorId: "",
      content: {},
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        // Edit post
        await axios.patch(`/api/posts/${initialData.id}`, data);
      } else {
        // Create new post
        await axios.post(`/api/posts`, data);
      }
      router.refresh();
      router.push("/posts");
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
      await axios.delete(`/api/posts/${params.categoryId}`);
      router.refresh();
      router.push("/posts");
      toast.success("Post deleted.");
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectAuditor = (value: any) => {
    const data = authors.find((x: AuthorColumn) => x.id === value);
    setSelectedAuthor(data);
    form.setValue("authorId", value);
  };

  const setSelectCategories = (values: string[]) => {
    const data = values.map((id: string) => {
      return categories.find((x: CategoryColumn) => x.id === id);
    });
    setSelectedCategories(data);
    form.setValue("categoryIds", values);
  };

  const handleRemoveCategoryById = (id: string) => {
    const currentSelectedCategories = selectedCategories.filter(
      (p: CategoryColumn) => p.id !== id
    );
    form.setValue(
      "categoryIds",
      currentSelectedCategories.map((x) => x.id) || []
    );
    setSelectedCategories(currentSelectedCategories);
    const mappedSelectedRow = currentSelectedCategories.reduce(function (
      obj: any,
      item: CategoryColumn
    ) {
      const index = categories.findIndex(
        (cate: CategoryColumn) => cate.id === item.id
      );
      obj[index] = true;
      return obj;
    },
    {});

    setSelectedCategoryRows(mappedSelectedRow);
  };

  const handleRemoveAllCategories = () => {
    form.setValue("categoryIds", null);
    setSelectedAuthor(undefined);
  };

  return (
    <>
      <AuthorModal
        isOpen={isOpenAuthorModal}
        isLoading={isLoading}
        data={
          selectedAuthor?.id
            ? authors.filter((x: AuthorColumn) => x.id !== selectedAuthor.id)
            : authors
        }
        selectedAuthorId={selectedAuthor?.id || {}}
        onClose={() => setIsOpenAuthorModal(false)}
        setSelectedAuthorId={setSelectAuditor}
      />
      <CategoryModal
        isOpen={isOpenCategoryModal}
        isLoading={isLoading}
        data={
          selectedCategories.length
            ? categories.filter((x: CategoryColumn) => {
                return selectedCategories.length
                  ? !selectedCategories.some((y) => y.id === x.id)
                  : true;
              })
            : categories
        }
        setSelectedCategoryRows={setSelectedCategoryRows}
        selectedCategoryRows={selectedCategoryRows}
        onClose={() => setIsOpenCategoryModal(false)}
        setCategories={setSelectCategories}
      />
      <CategoryFormModal
        isOpen={isOpenCategoryFormModal}
        onClose={() => setIsOpenCategoryFormModal(false)}
        selectedCategory={form.getValues("categoryIds")}
        setCategories={setSelectCategories}
      />
      <AuthorFormModal
        isOpen={isOpenAuthorFormModal}
        onClose={() => setIsOpenAuthorFormModal(false)}
        setAuthor={setSelectAuditor}
      />
      <GalleryModal
        isOpen={isOpenGalleryModal}
        isLoading={isLoading}
        title="Gallery"
        onChange={(url) => {
          form.setValue("featuredImage", { url: url });
          setIsOpenGalleryModal(false);
        }}
        onClose={() => setIsOpenGalleryModal(false)}
        resources={resources}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <TextInputFormItem
                  isUnique={true}
                  isRequired={true}
                  label="Title"
                  value={field.value || ""}
                  placeholder="Post title"
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
                  placeholder="react-testing"
                  disabled={isLoading}
                  onChange={(value) => field.onChange(value)}
                  onRemove={() => field.onChange("")}
                />
              )}
            />
          </div>
          <div className="flex w-full">
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Editor
                      data={field.value}
                      holder="editorjs-excerpt"
                      disabled={isLoading}
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      data={field.value}
                      holder="editorjs-content"
                      disabled={isLoading}
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <SelectionFormItem
                  isUnique={false}
                  isRequired={true}
                  label="Featured Image"
                  value={field?.value?.url}
                  onRemove={handleRemoveAllCategories}
                >
                  <div className=" flex flex-col">
                    {field?.value?.url && (
                      <CldImage
                        width={100}
                        height={100}
                        alt="upload-image"
                        src={field.value.url}
                      />
                    )}
                    <div className="flex flex-row">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpenGalleryModal(true)}
                      >
                        <BsLink className=" w-6 h-6 mr-2" />
                        Add Featured Image
                      </Button>
                      <UploadButton
                        disabled={isLoading}
                        onChange={(url) => {
                          field.onChange(url);
                          console.log(url);
                        }}
                      ></UploadButton>
                    </div>
                  </div>
                </SelectionFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeaturePost"
              render={({ field }) => (
                <FormItem>
                  <RadioGroupFormItem
                    isUnique={false}
                    isRequired={true}
                    label="Featured Post"
                    value={field.value}
                    options={featuredPostOptions}
                    onChange={(value) => field.onChange(value)}
                    onRemove={() => field.onChange(null)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <SelectionFormItem
                  isUnique={false}
                  isRequired={true}
                  label="Author"
                  value={field.value}
                  onRemove={handleRemoveAllCategories}
                >
                  <div className="flex flex-col">
                    {field.value && (
                      <AuthorCard
                        data={selectedAuthor}
                        onRemove={() => {
                          field.onChange(null);
                          setSelectedAuthor(undefined);
                        }}
                      />
                    )}
                    <div className="flex flex-row">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setIsOpenAuthorModal(true)}
                      >
                        <BsLink className=" w-6 h-6 mr-2" /> Add existing
                        Auditor
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpenAuthorFormModal(true)}
                      >
                        <Plus className="w-5 h-5 mr-2" /> Create & add new
                        Auditor
                      </Button>
                    </div>
                  </div>
                </SelectionFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <SelectionFormItem
                  isUnique={false}
                  isRequired={true}
                  label="Categories"
                  value={field.value}
                  onRemove={() => {
                    field.onChange(null);
                    setSelectedCategories([]);
                    setSelectedCategoryRows({});
                  }}
                >
                  <div className="flex flex-col">
                    {field.value &&
                      field.value.map((x: string) => {
                        const category = categories.find(
                          (cate: CategoryColumn) => cate.id === x
                        );
                        return (
                          <CategoryCard
                            data={category}
                            key={x}
                            onRemove={() => handleRemoveCategoryById(x)}
                          />
                        );
                      })}

                    <div className="flex flex-row">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpenCategoryModal(true)}
                      >
                        <BsLink className=" w-6 h-6 mr-2" /> Add existing
                        Categories
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpenCategoryFormModal(true)}
                      >
                        <Plus className="w-5 h-5 mr-2" /> Create & add new
                        Categories
                      </Button>
                    </div>
                  </div>
                </SelectionFormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
