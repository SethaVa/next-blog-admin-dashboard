"use client";

import React from "react";

// Components
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { FormControl, FormLabel, FormMessage } from "../ui/form";

interface TextInputFormItemProps {
  isUnique?: boolean;
  isRequired?: boolean;
  label: string;
  value: string;
  placeholder?: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const TextInputFormItem: React.FC<TextInputFormItemProps> = ({
  isUnique,
  isRequired,
  label,
  value,
  placeholder,
  disabled,
  onChange,
  onRemove,
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

      <FormControl>
        <Input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormControl>
      <FormMessage />
    </div>
  );
};

export default TextInputFormItem;
