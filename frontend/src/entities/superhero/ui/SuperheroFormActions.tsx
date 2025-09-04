"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  loading: boolean;
  editingId?: number | null;
  onCancel?: () => void;
}

export const SuperheroFormActions = ({
  loading,
  editingId,
  onCancel,
}: Props) => (
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
);
