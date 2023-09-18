"use client";

import { useState } from "react";

// Components
import { PostColumn } from "./Columns";
import Modal from "@/components/ui/modal";
import { VscMarkdown } from "react-icons/vsc";
import EditorTextParser from "@/components/editor-parser/EditorTextParser";

interface ButtonShowExerptModalProps {
  data: PostColumn;
}

const ButtonShowExcerptModal: React.FC<ButtonShowExerptModalProps> = ({
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
        className="w-full max-w-xl"
      >
        <EditorTextParser data={data.excerpt} />
      </Modal>
      <div
        onClick={() => setIsOpen(true)}
        className="w-[50px] flex flex-row items-center justify-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md cursor-pointer"
      >
        <VscMarkdown className="w-5 h-5 text-indigo-600" />
      </div>
    </>
  );
};

export default ButtonShowExcerptModal;
