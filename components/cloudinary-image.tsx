"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { SearchResult } from "./gallery/gallery";
import { BsLink } from "react-icons/bs";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onChange: (selected: string) => void;
  } & Omit<CldImageProps, "src">
) {
  const { imageData, onChange } = props;

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      <BsLink
        onClick={() => onChange(imageData.url)}
        className="absolute w-8 h-8 p-1 top-2 left-2 text-indigo-600 cursor-pointer hover:bg-indigo-50 rounded-md"
      />
    </div>
  );
}
