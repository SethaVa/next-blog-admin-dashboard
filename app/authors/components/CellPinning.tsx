"use client";

import React from "react";

// Libs
import { BsLink } from "react-icons/bs";

// Components
import { AuthorColumn } from "./Columns";
import { Button } from "@/components/ui/button";

interface CellPinningProps {
  data: AuthorColumn;
  onClick: (value: AuthorColumn) => void;
}
const CellPinning: React.FC<CellPinningProps> = ({ data, onClick }) => {
  return (
    <Button
      type="button"
      className="text-indigo-600 bg-white hover:bg-indigo-100 p-2"
      onClick={() => onClick(data)}
    >
      <BsLink className="w-5 h-5" />
    </Button>
  );
};
