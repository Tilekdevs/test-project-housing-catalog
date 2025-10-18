import { useMutation, useQuery } from '@tanstack/react-query';
import { listingsApi } from '../../../shared/api/ListingsApi';
import { useAuthStore } from '@/app/store/useAuthStore';

export function useBooking(listingId: string) {
  const { token } = useAuthStore();

  const { data: bookings } = useQuery({
    queryKey: ['bookings', listingId],
    queryFn: () => listingsApi.getBookings(listingId),
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: { checkIn: string; checkOut: string; guests: number }) => {
      if (!token) {
        throw new Error('User is not authenticated');
      }
      return listingsApi.createBooking({ ...data, listingId }, token);
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        throw new Error('Эти даты уже заняты');
      }
      throw new Error('Ошибка при бронировании');
    }
  });

  const isDateBooked = (date: string) => {
    if (!bookings || !date) return false;
    return bookings.some(booking => {
      const checkDate = new Date(date);
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      return checkDate >= start && checkDate <= end;
    });
  };

  return {
    bookProperty: bookingMutation.mutateAsync,
    isDateBooked,
    isLoading: bookingMutation.status === 'pending',
  };
}