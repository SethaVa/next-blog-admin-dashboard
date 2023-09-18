"use client";

// Components
import { SearchResult } from "./gallery";
import { ImageGrid } from "../image-grid";
import { CloudinaryImage } from "../cloudinary-image";

interface GalleryGridProps {
  images: SearchResult[];
  onChange: (selected: string) => void;
}
const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onChange }) => {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        const onClick = (selected: any) => {
          onChange(selected);
        };
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onChange={(selected) => onClick(selected)}
          />
        );
      }}
    />
  );
};

export default GalleryGrid;
