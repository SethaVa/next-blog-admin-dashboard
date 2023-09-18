// Libs
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

// Components
import AuthorList from "./components/AuthorList";
import { Suspense } from "react";
import Loading from "./loading";

const Author = async () => {
  const authors = await prismadb.author.findMany();

  const formattedAuthors = authors.map((author) => ({
    id: author.id,
    name: author.name,
    photo: author.photo,
    bio: author.bio,
    createdAt: format(author.createdAt, "MMMM do, yyyy HH:mm"),
    updatedAt: format(author.updatedAt, "MMMM do, yyyy HH:mm"),
    isPublished: author.isPublished || false,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <AuthorList data={formattedAuthors} />
        </Suspense>
      </div>
    </div>
  );
};

export default Author;
