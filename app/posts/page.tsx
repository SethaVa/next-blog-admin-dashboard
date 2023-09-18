// Libs
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

// Components
import PostList from "./components/PostList";
import { PostColumn } from "./components/Columns";
import { Suspense } from "react";
import Loading from "./loading";

const Page = async () => {
  const posts = await prismadb.post.findMany({
    include: {
      author: true,
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPosts: PostColumn[] = posts.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    isPublished: item?.isPublished || false,
    featuredImage: item?.featuredImage?.url || "",
    isFeaturedPost: item?.isFeaturePost || false,
    author: item?.author?.name || "",
    categoryNumber: item?.categories?.length || 0,
    categories: item?.categories,
  }));

  return (
    <div className="flex-col bg-black ">
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <PostList data={formattedPosts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
