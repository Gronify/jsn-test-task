import { useState, useEffect } from "react";
import { Superhero } from "@/entities/superhero/model/superhero.types";
import * as api from "@/shared/api/superhero";

export const useSuperheroCatalog = () => {
  const [catalog, setCatalog] = useState<Superhero[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  const loadCatalog = async (pageToLoad = page) => {
    setLoadingCatalog(true);
    try {
      const { data, hasNextPage } = await api.fetchSuperheroes(pageToLoad);
      setCatalog(data);
      setHasNextPage(hasNextPage);
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
      await api.deleteSuperhero(id);
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
