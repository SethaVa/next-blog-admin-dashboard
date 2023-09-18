"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface UploadButtonProps {
  disabled: boolean;
  onChange: (value: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ disabled, onChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.url);
  };

  return (
    <div>
      <CldUploadWidget uploadPreset="next-blog" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant="ghost" onClick={onClick}>
              <Plus className="w-5 h-5 mr-2" />
              Upload & Add Featured Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadButton;
