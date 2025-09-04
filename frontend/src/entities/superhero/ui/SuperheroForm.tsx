import React, { ChangeEvent, FormEvent } from "react";
import { SuperheroFormNickname } from "./SuperheroFormNickname";
import { SuperheroFormSuperpowers } from "./SuperheroFormSuperpowers";
import { SuperheroFormImages } from "./SuperheroFormImages";
import { SuperheroFormExistingImages } from "./SuperheroFormExistingImages";
import { SuperheroFormActions } from "./SuperheroFormActions";
import { SuperheroFormRealName } from "./SuperheroFormRealName";
import { SuperheroFormOrigin } from "./SuperheroFormOrigin";
import { SuperheroFormCatchPhrase } from "./SuperheroFormCatchPhrase";

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
    <SuperheroFormNickname value={form.nickname} onChange={onChange} />
    <SuperheroFormRealName value={form.real_name} onChange={onChange} />
    <SuperheroFormOrigin value={form.origin_description} onChange={onChange} />
    <SuperheroFormSuperpowers
      superpowers={form.superpowers}
      onChange={onChange}
      onAddSuperpower={onAddSuperpower}
    />
    <SuperheroFormCatchPhrase value={form.catch_phrase} onChange={onChange} />
    <SuperheroFormImages files={form.images} onFilesChange={onFilesChange} />
    {editingId && (
      <SuperheroFormExistingImages
        images={existingImages}
        onRemove={onRemoveExistingImage}
      />
    )}
    <SuperheroFormActions
      loading={loading}
      editingId={editingId}
      onCancel={onCancel}
    />
  </form>
);
