import { useFiltersStore } from "../../../app/store/useFiltersStore";
import { useFavoritesStore } from "../../../app/store/useFavoritesStore";

export const useFilters = () => {
  const filters = useFiltersStore();
  const favorites = useFavoritesStore();

  const applyFilters = (localFilters: {
    minPrice: number;
    maxPrice: number;
    minRating: number;
  }) => {
    filters.setMinPrice(localFilters.minPrice);
    filters.setMaxPrice(localFilters.maxPrice);
    filters.setMinRating(localFilters.minRating);
  };

  const resetFilters = () => {
    filters.reset();
  };

  return { filters, favorites, applyFilters, resetFilters };
};
