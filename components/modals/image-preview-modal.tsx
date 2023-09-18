"use client";

import React from "react";

// Components
import Modal from "../ui/modal";
import { CldImage } from "next-cloudinary";

interface ImagePreviewModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageUrl,
  onClose,
  isOpen,
}) => {
  return (
    <Modal
      className="w-1/4"
      title=""
      description=""
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="flex justify-end items-center w-full pt-6 space-x-2">
        <CldImage width={500} height={500} alt="upload-image" src={imageUrl} />
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;
