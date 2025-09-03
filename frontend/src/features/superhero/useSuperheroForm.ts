import { useState } from "react";
import { Superhero } from "@/entities/superhero/model/superhero.types";

interface FormState {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: File[];
}

export const useSuperheroForm = (
  loadCatalog: (page?: number) => Promise<void>
) => {
  const emptyForm: FormState = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [""],
    catch_phrase: "",
    images: [],
  };

  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [existingImages, setExistingImages] = useState<
    { id: string; path: string }[]
  >([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "superpowers" && typeof index === "number") {
      const updated = [...form.superpowers];
      updated[index] = value;
      setForm((prev) => ({ ...prev, superpowers: updated }));
    } else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSuperpower = () =>
    setForm((prev) => ({ ...prev, superpowers: [...prev.superpowers, ""] }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setForm((prev) => ({ ...prev, images: Array.from(files) }));
  };

  const removeExistingImage = (id: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImages((prev) => [...prev, id]);
  };

  const startEdit = (hero: Superhero) => {
    setEditingId(hero.id);
    setForm({
      nickname: hero.nickname,
      real_name: hero.real_name,
      origin_description: hero.origin_description,
      superpowers: hero.superpowers.length ? hero.superpowers : [""],
      catch_phrase: hero.catch_phrase,
      images: [],
    });
    setExistingImages(hero.images);
    setRemovedImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nickname.trim()) return alert("Nickname is required");

    setLoading(true);
    const formData = new FormData();
    formData.append("nickname", form.nickname);
    formData.append("real_name", form.real_name);
    formData.append("origin_description", form.origin_description);
    form.superpowers.forEach((sp) => formData.append("superpowers", sp));
    formData.append("catch_phrase", form.catch_phrase);
    form.images.forEach((f) => formData.append("images", f));
    if (editingId)
      removedImages.forEach((id) => formData.append("removeImages", id));

    try {
      const url = editingId
        ? `http://localhost:3001/api/v1/superheroes/${editingId}`
        : `http://localhost:3001/api/v1/superheroes`;
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Failed to save superhero");
      await res.json();
      setForm(emptyForm);
      setEditingId(null);
      setExistingImages([]);
      setRemovedImages([]);
      loadCatalog(1);
    } catch (err) {
      console.error(err);
      alert("Error saving superhero");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setExistingImages([]);
    setRemovedImages([]);
  };

  return {
    form,
    editingId,
    existingImages,
    removedImages,
    loading,
    handleChange,
    handleAddSuperpower,
    handleFiles,
    removeExistingImage,
    startEdit,
    handleSubmit,
    resetForm,
    setEditingId,
    setExistingImages,
    setRemovedImages,
  };
};
