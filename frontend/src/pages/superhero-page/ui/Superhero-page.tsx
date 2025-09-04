"use client";

import { Superhero } from "@/entities/superhero/model/superhero.types";
import { SuperheroForm } from "@/entities/superhero/ui/SuperheroForm";
import { SuperheroViewForm } from "@/entities/superhero/ui/SuperheroViewModal";
import { Button } from "@/shared/components/ui/button";
import { SuperheroCatalog } from "@/widget/superhero-catalog";
import { SuperheroModal } from "@/widget/superhero-modal";
import React, { useState } from "react";
import { useSuperheroCatalog, useSuperheroForm } from "@/features/superhero";

export function SuperheroPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewHero, setViewHero] = useState<Superhero | null>(null);

  const {
    catalog,
    page,
    hasNextPage,
    loadingCatalog,
    loadCatalog,
    handleDelete,
  } = useSuperheroCatalog();
  const formHook = useSuperheroForm(loadCatalog);

  const handleView = (hero: Superhero) => {
    setViewHero(hero);
    setViewModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Button
        onClick={() => {
          formHook.resetForm();
          setEditModalOpen(true);
        }}
      >
        Create Superhero
      </Button>

      <SuperheroModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        title={formHook.editingId ? "Edit Superhero" : "Create Superhero"}
      >
        <SuperheroForm
          form={formHook.form}
          onChange={formHook.handleChange}
          onAddSuperpower={formHook.handleAddSuperpower}
          onFilesChange={formHook.handleFiles}
          onRemoveExistingImage={formHook.removeExistingImage}
          onSubmit={formHook.handleSubmit}
          editingId={formHook.editingId}
          existingImages={formHook.existingImages}
          onCancel={() => setEditModalOpen(false)}
          loading={formHook.loading}
        />
      </SuperheroModal>

      <SuperheroCatalog
        catalog={catalog}
        loadingCatalog={loadingCatalog}
        page={page}
        hasNextPage={hasNextPage}
        onView={handleView}
        onEdit={(hero) => {
          formHook.startEdit(hero);
          setEditModalOpen(true);
        }}
        onDelete={handleDelete}
        onPageChange={loadCatalog}
      />

      <SuperheroModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        title={viewHero?.nickname ?? "Superhero"}
      >
        {viewHero && <SuperheroViewForm hero={viewHero} />}
      </SuperheroModal>
    </div>
  );
}
