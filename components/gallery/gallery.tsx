"use client";

import React from "react";

// Components
import GalleryGrid from "./gallery-grid";

export type SearchResult = {
  public_id: string;
  tags: string[];
  url: string;
};

interface GalleryProps {
  resources: SearchResult[];
  onChange: (selected: string) => void;
}

const GalleryWidget: React.FC<GalleryProps> = ({ resources, onChange }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <GalleryGrid images={resources} onChange={onChange} />
      </div>
    </section>
  );
};

export default GalleryWidget;
