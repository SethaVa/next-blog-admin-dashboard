// Libs
import { format } from "date-fns";
import cloudinary from "cloudinary";
import prismadb from "@/lib/prismadb";

// Components
import PostForm from "./components/PostForm";
import { SearchResult } from "@/components/gallery/gallery";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Loading from "./loading";

interface PostPage {
  postId: string;
}

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  let post = null;

  if (postId.length > 3) {
    post = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  const title = post ? "Edit post" : "Create post";
  const description = post ? "Edit a post" : "Add a new post";

  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    isPublished: category.isPublished ? category.isPublished : false,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
    updatedAt: format(category.updatedAt, "MMMM do, yyyy"),
  }));

  const authors = await prismadb.author.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedAuthors = authors.map((author) => ({
    id: author.id,
    name: author.name,
    photo: author.photo,
    bio: author.bio,
    createdAt: format(author.createdAt, "MMMM do, yyyy"),
    updatedAt: format(author.updatedAt, "MMMM do, yyyy"),
    isPublished: author.isPublished || false,
  }));

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <div className="flex-col bg-white overflow-auto h-screen">
      <Suspense fallback={<Loading />}>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
          </div>
          <Separator />

          <PostForm
            initialData={post}
            categories={formattedCategories}
            authors={formattedAuthors}
            resources={results.resources}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default PostPage;
