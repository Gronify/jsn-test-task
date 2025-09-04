import { Superhero } from "@/entities/superhero/model/superhero.types";
import { Button } from "@/shared/components/ui/button";
import React from "react";

interface Props {
  catalog: Superhero[];
  loadingCatalog: boolean;
  page: number;
  hasNextPage: boolean;
  onView: (hero: Superhero) => void;
  onEdit: (hero: Superhero) => void;
  onDelete: (id: number) => void;
  onPageChange: (newPage: number) => void;
}

export const SuperheroCatalog = ({
  catalog,
  loadingCatalog,
  page,
  hasNextPage,
  onView,
  onEdit,
  onDelete,
  onPageChange,
}: Props) => (
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
                className="w-24 h-24 object-cover border rounded"
              />
            )}
            <h3 className="font-semibold">{hero.nickname}</h3>
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => onView(hero)}
              variant="default"
              size="sm"
              className="cursor-pointer"
            >
              View
            </Button>
            <Button
              onClick={() => onEdit(hero)}
              variant="secondary"
              size="sm"
              className="cursor-pointer"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(hero.id)}
              variant="destructive"
              size="sm"
              className="cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-between mt-4">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={loadingCatalog || page === 1}
        variant="secondary"
      >
        Previous
      </Button>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={loadingCatalog || !hasNextPage}
      >
        Next
      </Button>
    </div>
  </div>
);
