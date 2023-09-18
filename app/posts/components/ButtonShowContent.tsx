"use client";

import { useState } from "react";

// Components
import { PostColumn } from "./Columns";
import Modal from "@/components/ui/modal";
import { LuClipboardEdit } from "react-icons/lu";
import EditorTextParser from "@/components/editor-parser/EditorTextParser";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ButtonShowContentModalProps {
  data: PostColumn;
}

const ButtonShowContentModal: React.FC<ButtonShowContentModalProps> = ({
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        title=""
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-2/3 max-h-[90vh]"
      >
        <div className="max-h-[80vh] overflow-auto">
          <EditorTextParser data={data.content} />
        </div>
      </Modal>
      <div
        onClick={() => setIsOpen(true)}
        className="w-[50px] flex flex-row items-center justify-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md cursor-pointer"
      >
        <LuClipboardEdit className="w-5 h-5 text-indigo-600" />
      </div>
    </>
  );
};

export default ButtonShowContentModal;
