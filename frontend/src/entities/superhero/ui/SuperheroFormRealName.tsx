"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SuperheroFormRealName = ({ value, onChange }: Props) => (
  <div className="space-y-1">
    <Label>Real Name</Label>
    <Input
      name="real_name"
      placeholder="Enter real name"
      value={value}
      onChange={onChange}
    />
  </div>
);
