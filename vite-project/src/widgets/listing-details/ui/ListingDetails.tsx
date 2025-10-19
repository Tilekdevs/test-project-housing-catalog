import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { listingsApi } from '../../../entities/listing/model/listingsApi'
import { ListingPhotos } from '../../../entities/listing/ui/ListingPhotos'
import { BookingForm } from '../../../feature/booking/ui/BookingForm'

export const ListingDetails = () => {
	const { id } = useParams<{ id: string }>()

	const {
		data: listing,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['listing', id],
		queryFn: () => listingsApi.getListing(id!),
		enabled: !!id,
	})

	if (isLoading)
		return (
			<div className='p-4 flex justify-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		)

	if (isError)
		return (
			<div className='p-4 text-center'>
				<p className='text-red-500 mb-2'>Ошибка при загрузке данных 😢</p>
				<button
					onClick={() => window.location.reload()}
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
				>
					Повторить
				</button>
			</div>
		)

	if (!listing) return <p className='p-4'>Жильё не найдено</p>

	return (
		<div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6'>
			<ListingPhotos photos={listing.photos} />

			<h1 className='text-2xl font-bold mt-4 mb-2'>{listing.title}</h1>
			<p className='text-gray-500 mb-1'>📍 Город: {listing.city}</p>
			<p className='text-yellow-500 mb-1'>⭐ Рейтинг: {listing.rating}</p>
			<p className='text-gray-800 mb-2 font-medium'>
				💰 {listing.pricePerNight} $ / ночь
			</p>
			<p className='text-gray-700 mb-4'>{listing.description}</p>

			{listing.amenities?.length > 0 && (
				<div className='mb-4'>
					<h3 className='text-lg font-semibold mb-2'>Удобства:</h3>
					<ul className='flex flex-wrap gap-2'>
						{listing.amenities.map((item: string, i: number) => (
							<li
								key={i}
								className='bg-gray-100 border px-3 py-1 rounded-full text-sm text-gray-700'
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}

			<p className='text-sm text-gray-500 mb-6'>
				📅 Забронировано {listing.bookingsCount} раз(а)
			</p>

			<div className='border-t pt-4 mt-4'>
				<h2 className='text-lg font-semibold mb-2'>Бронирование</h2>
				<BookingForm
					listingId={listing.id}
					onSuccess={() => alert('✅ Бронирование успешно!')}
				/>
			</div>
		</div>
	)
}
