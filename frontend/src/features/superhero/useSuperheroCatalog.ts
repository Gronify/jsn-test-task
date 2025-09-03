import { useState, useEffect } from "react";
import { Superhero } from "@/entities/superhero/model/superhero.types";

export const useSuperheroCatalog = () => {
  const [catalog, setCatalog] = useState<Superhero[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  const loadCatalog = async (pageToLoad = page) => {
    setLoadingCatalog(true);
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/superheroes?page=${pageToLoad}&limit=5`
      );
      if (!res.ok) throw new Error("Failed to fetch catalog");
      const json = await res.json();
      setCatalog(json.data);
      setHasNextPage(json.data.length === 5);
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCatalog(false);
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

  useEffect(() => {
    loadCatalog(1);
  }, []);

  return {
    catalog,
    page,
    hasNextPage,
    loadingCatalog,
    loadCatalog,
    handleDelete,
  };
};
