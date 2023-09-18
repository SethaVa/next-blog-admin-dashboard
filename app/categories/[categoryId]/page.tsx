// Libs
import prismadb from "@/lib/prismadb";

// Components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import CategoryFormWidget from "./components/CategoryFormWidget";
import { Suspense } from "react";
import Loading from "./loading";

interface CategoryPage {
  categoryId: string;
}

export type SaveCategoryData = {
  name: String;
  slug: String;
  isPublished: boolean;
};

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;
  console.log(categoryId);
  let category = null;

  if (categoryId.length > 3) {
    category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  const title = category ? "Edit category" : "Create category";
  const description = category ? "Edit a category" : "Add a new category";

  return (
    <div className="flex-col bg-white h-screen">
      <div className="flex-2 p-8 h-full">
        <Suspense fallback={<Loading />}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <Heading title={title} description={description} />
            </div>
            <Separator />
            <CategoryFormWidget initialData={category} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
