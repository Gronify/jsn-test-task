"use client";

import React from "react";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

interface Props {
  images: { id: string; path: string }[];
  onRemove?: (id: string) => void;
}

export const SuperheroFormExistingImages = ({ images, onRemove }: Props) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-2">
      <Label className="block font-semibold mb-1">Existing Images</Label>
      <div className="flex space-x-2 flex-wrap">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-24 h-24 border rounded overflow-hidden"
          >
            <img
              src={"http://localhost:3001" + img.path}
              alt="existing"
              className="w-full h-full object-cover"
            />
            {onRemove && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 p-0 w-5 h-5 text-xs"
                onClick={() => onRemove(img.id)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
