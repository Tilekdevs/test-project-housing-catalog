import axios from 'axios';
import type { Listing, Booking } from '../../entities/listing/model/types';

const BASE_URL = 'http://localhost:4000';

interface ListingsParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
}

export const listingsApi = {
  getListings: async (params: ListingsParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, String(value));
    });
    
    const { data } = await axios.get<Listing[]>(
      `http://localhost:4000/listings?${searchParams.toString()}`
    );
    return data;
  },

  getListing: async (id: string): Promise<Listing> => {
    const { data } = await axios.get(`${BASE_URL}/listings/${id}`);
    return data;
  },

  getBookings: async (id: string): Promise<Booking[]> => {
    const { data } = await axios.get(`${BASE_URL}/listings/${id}/bookings`);
    return data;
  },

  createBooking: async (booking: Booking, token: string) => {
    return axios.post(`${BASE_URL}/bookings`, booking, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};