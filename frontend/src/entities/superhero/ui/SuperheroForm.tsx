import React, { ChangeEvent, FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

interface Props {
  form: {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string[];
    catch_phrase: string;
    images: File[];
  };
  existingImages?: { id: string; path: string }[];
  editingId?: number | null;
  removedImages?: string[];
  loading: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
  onAddSuperpower: () => void;
  onFilesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveExistingImage?: (id: string) => void;
  onCancel?: () => void;
  onSubmit: (e: FormEvent) => void;
}

export const SuperheroForm = ({
  form,
  existingImages = [],
  editingId,
  removedImages = [],
  loading,
  onChange,
  onAddSuperpower,
  onFilesChange,
  onRemoveExistingImage,
  onCancel,
  onSubmit,
}: Props) => (
  <form
    onSubmit={onSubmit}
    className="space-y-4 border p-6 rounded-lg shadow-sm"
  >
    <div className="space-y-1">
      <Label>Nickname</Label>
      <Input
        name="nickname"
        placeholder="Enter nickname"
        value={form.nickname}
        onChange={onChange}
      />
    </div>

    <div className="space-y-1">
      <Label>Real Name</Label>
      <Input
        name="real_name"
        placeholder="Enter real name"
        value={form.real_name}
        onChange={onChange}
      />
    </div>

    <div className="space-y-1">
      <Label>Origin Description</Label>
      <Textarea
        name="origin_description"
        placeholder="Describe origin"
        value={form.origin_description}
        onChange={onChange}
        className="resize-none"
      />
    </div>

    <div>
      <Label className="block font-semibold mb-2">Superpowers</Label>
      {form.superpowers.map((sp, index) => (
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

    <div className="space-y-1">
      <Label>Catch Phrase</Label>
      <Input
        name="catch_phrase"
        placeholder="Enter catch phrase"
        value={form.catch_phrase}
        onChange={onChange}
      />
    </div>

    <div className="space-y-1">
      <Label>Images</Label>
      <Input type="file" multiple onChange={onFilesChange} />
    </div>

    {form.images.length > 0 && (
      <div className="mt-2">
        <Label className="block font-semibold mb-1">Selected Images</Label>
        <div className="flex space-x-2 flex-wrap">
          {form.images.map((file, index) => (
            <div
              key={index}
              className="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {editingId && existingImages.length > 0 && (
      <div className="mt-2">
        <Label className="block font-semibold mb-1">Existing Images</Label>
        <div className="flex space-x-2 flex-wrap">
          {existingImages.map((img) => (
            <div
              key={img.id}
              className="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img
                src={"http://localhost:3001" + img.path}
                alt="existing"
                className="w-full h-full object-contain"
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 p-0 w-5 h-5 text-xs"
                onClick={() => onRemoveExistingImage?.(img.id)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="flex space-x-2 mt-4">
      <Button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : editingId
          ? "Update Superhero"
          : "Create Superhero"}
      </Button>
      {editingId && onCancel && (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </div>
  </form>
);
