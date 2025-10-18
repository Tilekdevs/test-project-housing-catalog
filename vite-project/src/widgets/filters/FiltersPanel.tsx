import { useState, useEffect } from "react";
import { useFiltersStore } from "../../app/store/useFiltersStore";
import { useFavoritesStore } from "../../app/store/useFavoritesStore";
import { listingsApi } from "../../shared/api/ListingsApi";

export function FiltersPanel() {
  const {
    city: globalCity,
    minPrice: globalMinPrice,
    maxPrice: globalMaxPrice,
    minRating: globalMinRating,
    sort: globalSort,
    setCity,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSort,
    reset,
  } = useFiltersStore();

  const { showOnlyFavorites, setShowOnlyFavorites } = useFavoritesStore();

  const [city, setCityLocal] = useState(globalCity);
  const [cities, setCities] = useState<string[]>([]);
  const [minPrice, setMinPriceLocal] = useState(globalMinPrice);
  const [maxPrice, setMaxPriceLocal] = useState(globalMaxPrice);
  const [minRating, setMinRatingLocal] = useState(globalMinRating);
  const [sort, setSortLocal] = useState<"price_asc" | "price_desc" | "rating_desc" | "favorites_first" | null>(globalSort);

  // Загружаем города из листингов
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const listings = await listingsApi.getListings({});
        const uniqueCities = Array.from(new Set(listings.map(l => l.city))).sort();
        setCities(uniqueCities);
      } catch (err) {
        console.error("Ошибка при загрузке городов:", err);
      }
    };
    fetchCities();
  }, []);

  const handleSearchClick = () => {
    setCity(city);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setMinRating(minRating);
    setSort(sort);
  };

  const handleResetClick = () => {
    reset();
    setCityLocal("");
    setMinPriceLocal(0);
    setMaxPriceLocal(0);
    setMinRatingLocal(0);
    setSortLocal(null);
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 bg-gray-50 border-b">
      <select
        value={city || ""}
        onChange={(e) => setCityLocal(e.target.value)}
        className="border p-2 rounded w-32"
      >
        <option value="">Все города</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Мин. цена"
        value={minPrice || ""}
        onChange={(e) => setMinPriceLocal(Number(e.target.value))}
        className="border p-2 rounded w-24"
      />
      <input
        type="number"
        placeholder="Макс. цена"
        value={maxPrice || ""}
        onChange={(e) => setMaxPriceLocal(Number(e.target.value))}
        className="border p-2 rounded w-24"
      />
      <input
        type="number"
        placeholder="Мин. рейтинг"
        value={minRating || ""}
        onChange={(e) => setMinRatingLocal(Number(e.target.value))}
        className="border p-2 rounded w-24"
      />
      <select
        value={sort || ""}
        onChange={(e) =>
          setSortLocal(
            e.target.value === "" ? null : (e.target.value as "price_asc" | "price_desc" | "rating_desc" | "favorites_first")
          )
        }
        className="border p-2 rounded"
      >
        <option value="">Без сортировки</option>
        <option value="price_asc">Цена ↑</option>
        <option value="price_desc">Цена ↓</option>
        <option value="rating_desc">Рейтинг ↓</option>
      </select>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          className="w-4 h-4 accent-blue-500"
        />
        Только избранные
      </label>

      <button
        onClick={handleSearchClick}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Поиск
      </button>

      <button
        onClick={handleResetClick}
        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
      >
        Сбросить
      </button>
    </div>
  );
}
