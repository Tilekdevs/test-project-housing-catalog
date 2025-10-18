import { useState } from 'react';
import { useBooking } from '../model/useBooking';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';

interface BookingFormProps {
  listingId: string;
  onSuccess: () => void;
}

export function BookingForm({ listingId, onSuccess }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const { token } = useAuthStore();
  
  const { bookProperty, isDateBooked } = useBooking(listingId);
  const today = new Date().toISOString().split('T')[0];

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    if (checkOut && new Date(checkOut) <= new Date(newCheckIn)) {
      setCheckOut('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!token) {
        navigate('/login', { state: { from: `/listing/${listingId}` } });
        return;
      }

      if (!checkIn || !checkOut) {
        alert('Пожалуйста, выберите даты заезда и выезда');
        return;
      }

      if (isDateBooked(checkIn) || isDateBooked(checkOut)) {
        alert('Выбранные даты уже заняты');
        return;
      }

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      if (checkInDate < todayDate) {
        alert('Нельзя выбрать прошедшую дату');
        return;
      }

      if (checkOutDate <= checkInDate) {
        alert('Дата выезда должна быть позже даты заезда');
        return;
      }

      await bookProperty({ checkIn, checkOut, guests });
      onSuccess();
      setCheckIn('');
      setCheckOut('');
      setGuests(1);
    } catch (error: any) {
      alert(error.message || 'Ошибка при бронировании');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Дата заезда</label>
        <input
          type="date"
          value={checkIn}
          onChange={handleCheckInChange}
          min={today}
          required
          className={`border p-2 rounded-md w-full ${
            isDateBooked(checkIn) ? 'border-red-500 bg-red-50' : ''
          }`}
        />
        {isDateBooked(checkIn) && (
          <p className="text-red-500 text-sm mt-1">Эта дата уже занята</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Дата выезда</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn || today}
          required
          className={`border p-2 rounded-md w-full ${
            isDateBooked(checkOut) ? 'border-red-500 bg-red-50' : ''
          }`}
        />
        {isDateBooked(checkOut) && (
          <p className="text-red-500 text-sm mt-1">Эта дата уже занята</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Количество гостей</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={e => setGuests(+e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isDateBooked(checkIn) || isDateBooked(checkOut)}
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        Забронировать
      </button>
    </form>
  );
}