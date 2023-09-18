"use client";

// Components
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import CategoryFormWidget from "./components/CategoryFormWidget";

const Loading = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <Heading
          title="Category"
          description="Manage categories for your post"
        />
      </div>
      <Separator />
      <CategoryFormWidget initialData={null} loading={true} />
    </div>
  );
};

export default Loading;
