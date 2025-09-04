"use client";

import React, { ChangeEvent } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SuperheroFormOrigin = ({ value, onChange }: Props) => (
  <div className="space-y-1">
    <Label>Origin Description</Label>
    <Textarea
      name="origin_description"
      placeholder="Describe origin"
      value={value}
      onChange={onChange}
      className="resize-none"
    />
  </div>
);
