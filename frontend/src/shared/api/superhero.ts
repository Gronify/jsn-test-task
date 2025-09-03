import { client } from "./client";
import { Superhero } from "@/entities/superhero/model/superhero.types";

export const fetchSuperheroes = async (page = 1, limit = 5) => {
  return client<{ data: Superhero[]; hasNextPage: boolean }>(
    `/superheroes?page=${page}&limit=${limit}`
  );
};

export const createSuperhero = async (formData: FormData) => {
  return client(`/superheroes`, { method: "POST", body: formData });
};

export const updateSuperhero = async (id: number, formData: FormData) => {
  return client(`/superheroes/${id}`, { method: "PATCH", body: formData });
};

export const deleteSuperhero = async (id: number) => {
  return client(`/superheroes/${id}`, { method: "DELETE" });
};
