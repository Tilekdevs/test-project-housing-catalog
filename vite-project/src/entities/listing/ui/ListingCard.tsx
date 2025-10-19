import { Link } from 'react-router-dom'
import type { Listing } from '../model/types'

interface ListingCardProps {
	listing: Listing
	isFavorite: boolean
	onToggleFavorite: (id: string) => void
}

export function ListingCard({
	listing,
	isFavorite,
	onToggleFavorite,
}: ListingCardProps) {
	return (
		<div className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-900/20 p-3 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-200 relative flex flex-col bg-white dark:bg-gray-800 group'>
			<button
				onClick={() => onToggleFavorite(listing.id)}
				aria-label={
					isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
				}
				className='absolute top-3 right-3 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 hover:scale-110 transition-transform duration-200 z-10'
			>
				{isFavorite ? '💖' : '🤍'}
			</button>
			<Link to={`/listing/${listing.id}`} className='flex flex-col h-full'>
				<div className='relative overflow-hidden rounded-lg mb-3'>
					<img
						src={
							`http://localhost:4000/${listing.thumbnailUrl}` ||
							'https://placehold.co/400x250'
						}
						alt={listing.title}
						className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				</div>
				<div className='flex-1 flex flex-col'>
					<h2 className='font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2'>
						{listing.title}
					</h2>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center'>
						📍 {listing.city}
					</p>
					<div className='mt-auto'>
						<p className='font-bold text-lg text-gray-900 dark:text-white mb-1'>
							{listing.pricePerNight} $ / ночь
						</p>
						<p className='text-sm text-yellow-600 dark:text-yellow-400 flex items-center'>
							⭐ {listing.rating}
						</p>
					</div>
				</div>
			</Link>
		</div>
	)
}
