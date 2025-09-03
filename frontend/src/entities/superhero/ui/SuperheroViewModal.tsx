"use client";

import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Superhero } from "../model/superhero.types";

interface Props {
  hero: Superhero;
}

export const SuperheroViewForm = ({ hero }: Props) => {
  return (
    <div className="space-y-6 border p-6 rounded-xl shadow-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">Nickname</Label>
          <Input value={hero.nickname} readOnly className="bg-gray-100" />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">Real Name</Label>
          <Input value={hero.real_name} readOnly className="bg-gray-100" />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Origin Description
        </Label>
        <Textarea
          value={hero.origin_description}
          readOnly
          className="resize-none bg-gray-100"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">Superpowers</Label>
        <div className="flex flex-wrap gap-2">
          {hero.superpowers.map((sp, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm"
            >
              {sp}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Catch Phrase
        </Label>
        <Input value={hero.catch_phrase} readOnly className="bg-gray-100" />
      </div>

      {hero.images.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">Images</Label>
          <div className="flex flex-wrap gap-3">
            {hero.images.map((img) => (
              <div
                key={img.id}
                className="w-28 h-28 border rounded-lg overflow-hidden shadow-md bg-gray-50 flex items-center justify-center"
              >
                <img
                  src={"http://localhost:3001" + img.path}
                  alt={hero.nickname}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
