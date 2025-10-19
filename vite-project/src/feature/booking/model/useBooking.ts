import { useAuthStore } from '@/app/store/useAuthStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { listingsApi } from '../../../entities/listing/model/listingsApi'
import { isDateInRange } from '../../../shared/lib/utils'

export function useBooking(listingId: string) {
	const { token } = useAuthStore()

	const { data: bookings } = useQuery({
		queryKey: ['bookings', listingId],
		queryFn: () => listingsApi.getBookings(listingId),
	})

	const bookingMutation = useMutation({
		mutationFn: async (data: {
			checkIn: string
			checkOut: string
			guests: number
		}) => {
			if (!token) {
				throw new Error('User is not authenticated')
			}
			return listingsApi.createBooking({ ...data, listingId }, token)
		},
		onError: (error: any) => {
			if (error.response?.status === 409) {
				throw new Error('Эти даты уже заняты')
			}
			throw new Error('Ошибка при бронировании')
		},
	})

	const isDateBooked = (date: string) => {
		if (!bookings || !date) return false
		return bookings.some(booking =>
			isDateInRange(date, booking.checkIn, booking.checkOut)
		)
	}

	return {
		bookProperty: bookingMutation.mutateAsync,
		isDateBooked,
		isLoading: bookingMutation.status === 'pending',
	}
}
