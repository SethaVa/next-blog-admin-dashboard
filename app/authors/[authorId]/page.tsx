// Libs
import prismadb from "@/lib/prismadb";

// Components
import AuthorFormWidget from "./components/AuthorFormWidget";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Loading from "./loading";

interface AuthorPage {
  categoryId: string;
}

const AuthorPage = async ({ params }: { params: { authorId: string } }) => {
  const { authorId } = params;
  let author = null;

  if (authorId.length > 3) {
    author = await prismadb.author.findUnique({
      where: {
        id: authorId,
      },
    });
  }

  const title = author ? "Edit author" : "Create author";
  const description = author ? "Edit a author" : "Add a new author";

  return (
    <div className="flex-col bg-white h-screen">
      <div className="flex-2 p-8 h-full">
        <Suspense fallback={<Loading />}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <Heading title={title} description={description} />
            </div>
            <Separator />
            <AuthorFormWidget initialData={author} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthorPage;
