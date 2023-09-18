"use client";

import { useState } from "react";

// Components
import { AuthorColumn } from "./Columns";
import Modal from "@/components/ui/modal";
import { BiDetail } from "react-icons/bi";

interface ButtonViewBioProps {
  data: AuthorColumn;
}

const ButtonViewBio: React.FC<ButtonViewBioProps> = ({ data }) => {
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
        {data.bio}
      </Modal>
      <div
        onClick={() => setIsOpen(true)}
        className="w-[50px] flex flex-row items-center justify-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md cursor-pointer"
      >
        <BiDetail className="w-5 h-5 text-indigo-600" />
      </div>
    </>
  );
};

export default ButtonViewBio;
