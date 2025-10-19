"use server"
import { apiClient } from '../../../shared/lib/axios'
import { buildSearchParams } from '../../../shared/lib/utils'
import type { Booking, Listing, PaginatedResponse } from './types'

interface ListingsParams {
	city?: string
	minPrice?: number
	maxPrice?: number
	minRating?: number
	sort?: string
	page?: number
	limit?: number
}

export const listingsApi = {
	getListings: async (params: ListingsParams): Promise<Listing[]> => {
		const searchParams = buildSearchParams(params)
		const { data } = await apiClient.get<Listing[]>(`/listings?${searchParams}`)
		return data
	},

	getListingsPaginated: async (params: ListingsParams): Promise<PaginatedResponse<Listing>> => {
		const searchParams = buildSearchParams(params)
		const { data } = await apiClient.get<PaginatedResponse<Listing>>(`/listings?${searchParams}`)
		return data
	},

	getListing: async (id: string): Promise<Listing> => {
		const { data } = await apiClient.get<Listing>(`/listings/${id}`)
		return data
	},

	getBookings: async (id: string): Promise<Booking[]> => {
		const { data } = await apiClient.get<Booking[]>(`/listings/${id}/bookings`)
		return data
	},

	createBooking: async (booking: Booking, token: string) => {
		return apiClient.post('/bookings', booking, {
			headers: { Authorization: `Bearer ${token}` },
		})
	},
}
