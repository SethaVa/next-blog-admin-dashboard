"use client";

import React from "react";

// Components
import Modal from "../ui/modal";

interface DataListModalProps {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DataListModal: React.FC<DataListModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      className="w-3/4"
      title={title}
      description=""
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </Modal>
  );
};

export default DataListModal;
