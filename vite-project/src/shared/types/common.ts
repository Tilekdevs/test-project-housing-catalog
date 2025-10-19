export interface ApiResponse<T> {
	data: T
	message?: string
	success: boolean
}

export interface PaginationParams {
	page?: number
	limit?: number
	offset?: number
}

export interface SortParams {
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
	search?: string
	category?: string
	minPrice?: number
	maxPrice?: number
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface BaseEntity {
	id: string
	createdAt: string
	updatedAt: string
}

export interface User extends BaseEntity {
	email: string
	name: string
	avatar?: string
}

export interface AuthTokens {
	accessToken: string
	refreshToken?: string
}

export interface AuthState {
	user: User | null
	tokens: AuthTokens | null
	isAuthenticated: boolean
}
