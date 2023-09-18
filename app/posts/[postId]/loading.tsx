"use client";

// Components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import PostForm from "./components/PostForm";

const Loading = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <Heading
          title="Category"
          description="Manage categories for your post"
        />
      </div>
      <Separator />
      <PostForm
        initialData={null}
        categories={null}
        authors={null}
        resources={null}
        loading={true}
      />
    </div>
  );
};

export default Loading;
