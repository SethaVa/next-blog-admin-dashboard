"use client";

import React from "react";

// Components
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FormControl, FormLabel, FormMessage } from "../ui/form";

interface TextInputFormItemProps {
  isUnique?: boolean;
  isRequired?: boolean;
  options: any;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const RadioGroupFormItem: React.FC<TextInputFormItemProps> = ({
  isUnique,
  isRequired,
  label,
  value,
  options,
  onChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <FormLabel>{label}</FormLabel>
        <div className="flex items-center gap-2">
          {value !== "" && (
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
        <RadioGroup
          className="flex flex-row gap-8 py-2"
          onValueChange={onChange}
          defaultValue={value}
        >
          {options.map((option: any) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.id} />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </div>
  );
};

export default RadioGroupFormItem;
