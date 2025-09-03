"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: { id: string; path: string }[];
}

export default function SuperheroPage() {
  const emptyForm = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [""],
    catch_phrase: "",
    images: [] as File[],
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewHero, setViewHero] = useState<Superhero | null>(null);

  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState<Superhero[]>([]);
  const [page, setPage] = useState(1);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "superpowers" && typeof index === "number") {
      const updated = [...form.superpowers];
      updated[index] = value;
      setForm((prev) => ({ ...prev, superpowers: updated }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSuperpower = () => {
    setForm((prev) => ({ ...prev, superpowers: [...prev.superpowers, ""] }));
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.nickname.trim()) return alert("Nickname is required");

    setLoading(true);
    const formData = new FormData();
    formData.append("nickname", form.nickname);
    formData.append("real_name", form.real_name);
    formData.append("origin_description", form.origin_description);
    form.superpowers.forEach((sp) => formData.append("superpowers", sp));
    formData.append("catch_phrase", form.catch_phrase);
    form.images.forEach((file) => formData.append("images", file));

    try {
      const url = editingId
        ? `http://localhost:3001/api/v1/superheroes/${editingId}`
        : `http://localhost:3001/api/v1/superheroes`;
      const method = editingId ? "PATCH" : "POST";
      if (editingId) {
        removedImages.forEach((id) => formData.append("removeImages", id));
      }

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Failed to save superhero");

      await res.json();

      setForm(emptyForm);
      setEditingId(null);

      loadCatalog(1);
    } catch (err) {
      console.error(err);
      alert("Error saving superhero");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this superhero?")) return;
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/superheroes/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete superhero");
      loadCatalog(1);
    } catch (err) {
      console.error(err);
      alert("Error deleting superhero");
    }
  };

  const [existingImages, setExistingImages] = useState<
    { id: string; path: string }[]
  >([]);
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
    setRemovedImages([]);
    setExistingImages(hero.images);
  };

  const loadCatalog = async (pageToLoad = page) => {
    setLoadingCatalog(true);
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/superheroes?page=${pageToLoad}&limit=5`
      );
      if (!res.ok) throw new Error("Failed to fetch catalog");

      const json = await res.json();
      const data: Superhero[] = json.data;

      setCatalog(data);
      setHasNextPage(data.length === 5);
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCatalog(false);
    }
  };

  const removeExistingImage = (id: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImages((prev) => [...prev, id]);
  };

  useEffect(() => {
    loadCatalog(1);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">
        {editingId ? "Edit Superhero" : "Create Superhero"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <input
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="real_name"
          placeholder="Real Name"
          value={form.real_name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="origin_description"
          placeholder="Origin Description"
          value={form.origin_description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <div>
          <label className="block font-semibold mb-2">Superpowers</label>
          {form.superpowers.map((sp, index) => (
            <input
              key={index}
              name="superpowers"
              placeholder={`Superpower ${index + 1}`}
              value={sp}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 w-full rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddSuperpower}
            className="text-blue-500 hover:underline text-sm"
          >
            + Add superpower
          </button>
        </div>
        <input
          name="catch_phrase"
          placeholder="Catch Phrase"
          value={form.catch_phrase}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          multiple
          onChange={handleFiles}
          className="border p-2 w-full rounded"
        />

        {editingId && existingImages.length > 0 && (
          <div className="mt-2">
            <label className="block font-semibold mb-1">Existing Images</label>
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
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Superhero"
            : "Create Superhero"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Superheroes Catalog</h2>
        {catalog.length === 0 && <p>No superheroes yet.</p>}
        <div className="grid grid-cols-1 gap-4">
          {catalog.map((hero) => (
            <div
              key={hero.id}
              className="border p-4 rounded shadow flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {hero.images?.[0] && (
                  <img
                    src={"http://localhost:3001" + hero.images[0].path}
                    alt={hero.nickname}
                    className="w-24 h-24 object-contain border rounded"
                  />
                )}
                <h3 className="font-semibold">{hero.nickname}</h3>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setViewHero(hero)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => startEdit(hero)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hero.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => loadCatalog(page - 1)}
            disabled={loadingCatalog || page === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => loadCatalog(page + 1)}
            disabled={loadingCatalog || !hasNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {viewHero && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-lg w-full relative">
            <button
              onClick={() => setViewHero(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{viewHero.nickname}</h2>
            <p>
              <strong>Real Name:</strong> {viewHero.real_name}
            </p>
            <p>
              <strong>Origin:</strong> {viewHero.origin_description}
            </p>
            <p>
              <strong>Catch Phrase:</strong> {viewHero.catch_phrase}
            </p>
            <p>
              <strong>Superpowers:</strong> {viewHero.superpowers.join(", ")}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {viewHero.images.map((img) => (
                <img
                  key={img.id}
                  src={"http://localhost:3001" + img.path}
                  alt={viewHero.nickname}
                  className="w-full h-32 object-contain border rounded"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
