import { create } from "zustand";
import { persist } from "zustand/middleware";

type SortType = "price_asc" | "price_desc" | "rating_desc" | "favorites_first" | null;

interface FiltersState {
  city: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortType;

  setCity: (v: string) => void;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  setMinRating: (v: number) => void;
  setSort: (v: SortType) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      city: "",
      minPrice: 0,
      maxPrice: 0,
      minRating: 0,
      sort: null,
      setCity: (city) => set({ city }),
      setMinPrice: (minPrice) => set({ minPrice }),
      setMaxPrice: (maxPrice) => set({ maxPrice }),
      setMinRating: (minRating) => set({ minRating }),
      setSort: (sort) => set({ sort }),
      reset: () => set({ city: "", minPrice: 0, maxPrice: 0, minRating: 0, sort: null }),
    }),
    { name: "filters-storage" }
  )
);
