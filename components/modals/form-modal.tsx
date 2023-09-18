"use client";

import React from "react";

// Components
import Modal from "../ui/modal";

interface FormModalProps {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      className="w-2/3"
      title={title}
      description=""
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </Modal>
  );
};

export default FormModal;
