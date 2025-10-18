import { useFavoritesStore } from '@/app/store/useFavoritesStore';
import { useFiltersStore } from '@/app/store/useFiltersStore';
import { FiltersPanel } from '@/widgets/filters/FiltersPanel';
import { ListingCard } from '../../entities/listing/ui/ListingCard';
import { useQuery } from '@tanstack/react-query';
import { listingsApi } from '../../shared/api/ListingsApi';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { city, minPrice, maxPrice, minRating, sort, reset } = useFiltersStore();
  const { favorites, toggleFavorite, loadFavorites, showOnlyFavorites } = useFavoritesStore();
  const [sortFavorites, setSortFavorites] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['listings', city, minPrice, maxPrice, minRating, sort],
    queryFn: () =>
      listingsApi.getListings({
        city,
        minPrice,
        maxPrice,
        minRating,
        sort: sort || undefined,
      }),
  });

  const handleReset = () => {
    reset();   // сброс Zustand фильтров
    setSortFavorites(false); // сброс сортировки любимых
    refetch(); // перезапрос данных
  };

  if (isLoading) return <p className='p-4'>Загрузка...</p>;
  if (isError) return <p className='p-4 text-red-500'>Ошибка при загрузке данных.</p>;

  // 1️⃣ Сначала сортировка «сначала любимые» (не скрывает не любимые)
  let displayedData = data || [];
  if (sortFavorites) {
    displayedData = [...displayedData].sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 0 : 1;
      const bFav = favorites.includes(b.id) ? 0 : 1;
      return aFav - bFav;
    });
  }

  // 2️⃣ Фильтр «только избранные»
  if (showOnlyFavorites) {
    displayedData = displayedData.filter((listing) => favorites.includes(listing.id));
  }

  if (!displayedData.length) {
    return (
      <div className='text-center p-10 text-gray-500'>
        <p className='text-lg mb-2'>😕 Ничего не найдено</p>
        <p>Попробуй изменить фильтры или сбросить поиск.</p>
        <button
          onClick={handleReset}
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Сбросить фильтры
        </button>
      </div>
    );
  }

  return (
    <div>
      <FiltersPanel/>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {displayedData.map((listing, index) => (
          <ListingCard
            key={`${listing.id}-${index}`}
            listing={listing}
            isFavorite={favorites.includes(listing.id)}
            onFavoriteToggle={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
