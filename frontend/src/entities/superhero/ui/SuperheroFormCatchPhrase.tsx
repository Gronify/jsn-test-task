"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SuperheroFormCatchPhrase = ({ value, onChange }: Props) => (
  <div className="space-y-1">
    <Label>Catch Phrase</Label>
    <Input
      name="catch_phrase"
      placeholder="Enter catch phrase"
      value={value}
      onChange={onChange}
    />
  </div>
);
