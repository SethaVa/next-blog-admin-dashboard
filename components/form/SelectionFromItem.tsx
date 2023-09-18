"use client";

import React from "react";

// Components
import { Badge } from "../ui/badge";
import { FormControl, FormLabel, FormMessage } from "../ui/form";

interface SelectionFormItemProps {
  isUnique?: boolean;
  isRequired?: boolean;
  label: string;
  value: string;
  onRemove: () => void;
  children: React.ReactNode;
}

const SelectionFormItem: React.FC<SelectionFormItemProps> = ({
  isUnique,
  isRequired,
  label,
  value,
  onRemove,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <FormLabel>{label}</FormLabel>
        <div className="flex items-center gap-2">
          {value && value !== "" && (
            <div
              onClick={onRemove}
              className="font-semibold text-sm cursor-pointer text-indigo-500 hover:text-indigo-600"
            >
              clear
            </div>
          )}
          {isUnique && (
            <Badge
              variant="secondary"
              className="text-muted-foreground rounded-sm"
            >
              unique
            </Badge>
          )}

          {isRequired && (
            <Badge
              variant="secondary"
              className="text-muted-foreground rounded-sm"
            >
              required
            </Badge>
          )}
        </div>
      </div>

      <FormControl>{children}</FormControl>
      <FormMessage />
    </div>
  );
};

export default SelectionFormItem;
