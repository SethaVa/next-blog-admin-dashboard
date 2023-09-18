"use client";

import React from "react";

// Components
import Modal from "../ui/modal";
import GalleryWidget from "../gallery/gallery";
import { ScrollArea } from "../ui/scroll-area";

interface GalleryModalProps {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onChange: (val: string) => void;
  resources: any[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  title,
  isOpen,
  onClose,
  resources,
  onChange,
}) => {
  return (
    <Modal
      className="w-2/3"
      title={title}
      description=""
      onClose={onClose}
      isOpen={isOpen}
    >
      <ScrollArea className="w-full h-[600px]">
        <GalleryWidget resources={resources} onChange={onChange} />
      </ScrollArea>
    </Modal>
  );
};

export default GalleryModal;
