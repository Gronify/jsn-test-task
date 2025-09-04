"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SuperheroFormNickname = ({ value, onChange }: Props) => (
  <div className="space-y-1">
    <Label>Nickname</Label>
    <Input
      name="nickname"
      placeholder="Enter nickname"
      value={value}
      onChange={onChange}
    />
  </div>
);
