// Libs
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

// Components
import CategoryList from "./components/categoryList";
import { CategoryColumn } from "./components/columns";
import { Suspense } from "react";
import Loading from "./loading";

const Category = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    isPublished: item.isPublished || false,
    createdAt: format(item.createdAt, "MMMM do, yyyy HH:mm"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy HH:mm"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <CategoryList data={formattedCategories} />
        </Suspense>
      </div>
    </div>
  );
};

export default Category;
