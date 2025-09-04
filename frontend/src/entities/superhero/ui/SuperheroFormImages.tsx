"use client";

import React, { ChangeEvent, useRef } from "react";
import { Label } from "@/shared/components/ui/label";

interface Props {
  files: File[];
  onFilesChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SuperheroFormImages = ({ files, onFilesChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <Label className="block font-semibold">Images</Label>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={onFilesChange}
      />

      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
      >
        <svg
          className="w-8 h-8 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-blue-600">Click to upload</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
      </div>

      {files.length > 0 && (
        <div>
          <Label className="block font-semibold mb-1">Selected Images</Label>
          <div className="flex space-x-2 flex-wrap">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
