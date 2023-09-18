"use client";

// Components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AuthorFormWidget from "./components/AuthorFormWidget";

const Loading = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center pb-4">
        <Heading
          title="Category"
          description="Manage categories for your post"
        />
      </div>
      <Separator />
      <AuthorFormWidget initialData={null} loading={true} />
    </div>
  );
};

export default Loading;
