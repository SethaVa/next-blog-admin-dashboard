"use client";

import { useState } from "react";

// Components
import { PostColumn } from "../../app/posts/components/Columns";
import Modal from "@/components/ui/modal";
import CategoryCard from "@/components/card/CategoryCard";
import { CategoryColumn } from "@/app/categories/components/columns";
import { BsLink } from "react-icons/bs";
import ImagePreviewModal from "@/components/modals/image-preview-modal";
import { CldImage } from "next-cloudinary";

interface ButtonPreviewFeaturedImageProps {
  featuredImage: string;
}

const ButtonPreviewFeaturedImage: React.FC<ButtonPreviewFeaturedImageProps> = ({
  featuredImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ImagePreviewModal
        isOpen={isOpen}
        imageUrl={featuredImage}
        onClose={() => setIsOpen(false)}
      />
      <div onClick={() => setIsOpen(true)}>
        <CldImage
          width={50}
          height={50}
          alt="upload-image"
          className="cursor-pointer"
          src={featuredImage}
        />
      </div>
    </>
  );
};

export default ButtonPreviewFeaturedImage;
