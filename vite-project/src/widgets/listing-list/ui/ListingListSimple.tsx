import { useQuery } from '@tanstack/react-query'
import { useFavoritesStore } from '../../../app/store/useFavoritesStore'
import { useFiltersStore } from '../../../app/store/useFiltersStore'
import { listingsApi } from '../../../entities/listing/model/listingsApi'
import { ListingCard } from '../../../entities/listing/ui/ListingCard'

interface ListingListSimpleProps {
	className?: string
}

export const ListingListSimple = ({ className }: ListingListSimpleProps) => {
	const filters = useFiltersStore()
	const {
		favorites: favIds,
		toggleFavorite,
		showOnlyFavorites,
	} = useFavoritesStore()

	const { data: listings = [], isLoading } = useQuery({
		queryKey: ['listings', filters, showOnlyFavorites],
		queryFn: () =>
			listingsApi.getListings({
				city: filters.city || undefined,
				minPrice: filters.minPrice || undefined,
				maxPrice: filters.maxPrice || undefined,
				minRating: filters.minRating || undefined,
				sort: filters.sort || undefined,
			}),
	})

	const filteredListings = showOnlyFavorites
		? listings.filter(listing => favIds.includes(listing.id))
		: listings

	if (isLoading) return <div>Загрузка...</div>

	if (showOnlyFavorites && filteredListings.length === 0) {
		return (
			<div className='text-center py-8'>
				<p className='text-gray-500'>У вас пока нет избранных объявлений</p>
			</div>
		)
	}

	return (
		<div className={`grid grid-cols-3 gap-4 mt-4 ${className || ''}`}>
			{filteredListings.map(listing => (
				<ListingCard
					key={listing.id}
					listing={listing}
					isFavorite={favIds.includes(listing.id)}
					onToggleFavorite={() => toggleFavorite(listing.id)}
				/>
			))}
		</div>
	)
}
