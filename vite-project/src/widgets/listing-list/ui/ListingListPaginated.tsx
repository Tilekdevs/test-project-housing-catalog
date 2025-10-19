import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useFavoritesStore } from '../../../app/store/useFavoritesStore'
import { useFiltersStore } from '../../../app/store/useFiltersStore'
import { listingsApi } from '../../../entities/listing/model/listingsApi'
import { ListingCard } from '../../../entities/listing/ui/ListingCard'

interface ListingListPaginatedProps {
	className?: string
}

export const ListingListPaginated = ({
	className,
}: ListingListPaginatedProps) => {
	const filters = useFiltersStore()
	const {
		favorites: favIds,
		toggleFavorite,
		showOnlyFavorites,
	} = useFavoritesStore()

	const [currentPage, setCurrentPage] = useState(1)
	const limit = 6

	const { data, isLoading, error } = useQuery({
		queryKey: ['listings-paginated', filters, showOnlyFavorites, currentPage],
		queryFn: () =>
			listingsApi.getListings({
				city: filters.city || undefined,
				minPrice: filters.minPrice || undefined,
				maxPrice: filters.maxPrice || undefined,
				minRating: filters.minRating || undefined,
				sort: filters.sort || undefined,
			}),
	})

	const allListings = data || []
	const totalPages = Math.ceil(allListings.length / limit)
	const startIndex = (currentPage - 1) * limit
	const endIndex = startIndex + limit
	const paginatedListings = allListings.slice(startIndex, endIndex)
	const filteredListings = showOnlyFavorites
		? paginatedListings.filter(listing => favIds.includes(listing.id))
		: paginatedListings

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (isLoading) return <div>Загрузка...</div>

	if (error) {
		return (
			<div className='text-center py-8'>
				<p className='text-red-500'>Ошибка при загрузке данных</p>
				<button
					onClick={() => window.location.reload()}
					className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
				>
					Повторить
				</button>
			</div>
		)
	}

	if (showOnlyFavorites && filteredListings.length === 0) {
		return (
			<div className='text-center py-8'>
				<p className='text-gray-500'>У вас пока нет избранных объявлений</p>
			</div>
		)
	}

	return (
		<div className={className}>
			<div className='grid grid-cols-3 gap-4 mt-4'>
				{filteredListings.map(listing => (
					<ListingCard
						key={listing.id}
						listing={listing}
						isFavorite={favIds.includes(listing.id)}
						onToggleFavorite={() => toggleFavorite(listing.id)}
					/>
				))}
			</div>
			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-2 mt-8'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
					>
						← Назад
					</button>

					<div className='flex gap-1'>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									currentPage === page
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								{page}
							</button>
						))}
					</div>

					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
					>
						Вперед →
					</button>
				</div>
			)}
			<div className='text-center text-sm text-gray-500 mt-4'>
				Страница {currentPage} из {totalPages} • Всего объявлений:{' '}
				{allListings.length}
			</div>
		</div>
	)
}
