import { Link } from 'react-router-dom'
import type { Listing } from '../model/types'

interface ListingCardProps {
  listing: Listing;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export function ListingCard({ listing, isFavorite, onFavoriteToggle }: ListingCardProps) {
  return (
    <div className='border rounded-xl shadow p-3 hover:shadow-lg transition relative flex flex-col sm:flex-col'>
      <button
        onClick={() => onFavoriteToggle(listing.id)}
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        className='absolute top-2 right-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full'
      >
        {isFavorite ? '💖' : '🤍'}
      </button>
      <Link to={`/listing/${listing.id}`} className="flex flex-col h-full">
        <img
          src={`http://localhost:4000/${listing.thumbnailUrl}` || 'https://placehold.co/400x250'}
          alt={listing.title}
          className='w-full h-full object-cover'
        />
        <div className='mt-auto pt-2'>
          <h2 className='font-semibold text-lg'>{listing.title}</h2>
          <p className='text-gray-500'>{listing.city}</p>
          <p className='font-medium'>{listing.pricePerNight} $ / ночь</p>
          <p className='text-sm text-yellow-600'>⭐ {listing.rating}</p>
        </div>
      </Link>
    </div>
  )
}