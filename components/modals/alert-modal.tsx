"use client";

import React from "react";

// Components
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      className="w-1/4"
      title="Are you sure?"
      description="The action cannot be undone."
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="flex justify-end items-center w-full pt-6 space-x-2">
        <Button disabled={isLoading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
