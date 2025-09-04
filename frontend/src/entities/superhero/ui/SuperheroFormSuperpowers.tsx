"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

interface Props {
  superpowers: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  onAddSuperpower: () => void;
}

export const SuperheroFormSuperpowers = ({
  superpowers,
  onChange,
  onAddSuperpower,
}: Props) => (
  <div>
    <Label className="block font-semibold mb-2">Superpowers</Label>
    {superpowers.map((sp, index) => (
      <div key={index} className="mb-2">
        <Input
          name="superpowers"
          placeholder={`Superpower ${index + 1}`}
          value={sp}
          onChange={(e) => onChange(e, index)}
        />
      </div>
    ))}
    <Button type="button" variant="link" onClick={onAddSuperpower}>
      + Add superpower
    </Button>
  </div>
);
