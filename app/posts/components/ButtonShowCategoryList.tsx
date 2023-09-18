"use client";

import { useState } from "react";

// Components
import { PostColumn } from "./Columns";
import Modal from "@/components/ui/modal";
import CategoryCard from "@/components/card/CategoryCard";
import { CategoryColumn } from "@/app/categories/components/columns";
import { BsLink } from "react-icons/bs";

interface ButtonShowCategoryListProps {
  data: PostColumn;
}

const ButtonShowCategoryList: React.FC<ButtonShowCategoryListProps> = ({
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        title="Categories"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-xl"
      >
        {data.categories.map((category: CategoryColumn) => (
          <CategoryCard data={category} key={category.id} />
        ))}
      </Modal>
      <div
        onClick={() => setIsOpen(true)}
        className="w-[50px] flex flex-row items-center justify-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md cursor-pointer"
      >
        <BsLink className="w-8 h-8 text-indigo-600" />
        <p className="text-indigo-600">{data.categoryNumber}</p>
      </div>
    </>
  );
};

export default ButtonShowCategoryList;
