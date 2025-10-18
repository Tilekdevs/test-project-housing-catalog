import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from './useAuthStore'

interface FavoritesState {
	favorites: string[]
	toggleFavorite: (listingId: string) => Promise<void>
	loadFavorites: () => Promise<void>
	showOnlyFavorites: boolean
	setShowOnlyFavorites: (value: boolean) => void
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		set => ({
			favorites: [],
			showOnlyFavorites: false,

			async loadFavorites() {
				const { token } = useAuthStore.getState()
				if (!token) return

				try {
					const res = await axios.get('http://localhost:4000/me/favorites', {
						headers: { Authorization: `Bearer ${token}` },
						validateStatus: status => status >= 200 && status < 500,
					})
					set(state => ({
						favorites: res.data?.length ? res.data : state.favorites,
					}))
				} catch (e) {
					console.error('Ошибка загрузки избранного', e)
				}
			},

			async toggleFavorite(listingId) {
				const { token } = useAuthStore.getState()
				if (!token) {
					alert('Нужно войти, чтобы добавлять в избранное')
					return
				}

				set(state => {
					const isFav = state.favorites.includes(listingId)
					return {
						favorites: isFav
							? state.favorites.filter(id => id !== listingId)
							: [...state.favorites, listingId],
					}
				})

				try {
					const res = await axios.post(
						`http://localhost:4000/me/favorites/${listingId}/toggle`,
						{},
						{ headers: { Authorization: `Bearer ${token}` } }
					)

					const { isFavorite } = res.data
					set(state => ({
						favorites: isFavorite
							? [...new Set([...state.favorites, listingId])]
							: state.favorites.filter(id => id !== listingId),
					}))
				} catch (e) {
					set(state => ({
						favorites: state.favorites.includes(listingId)
							? state.favorites.filter(id => id !== listingId)
							: [...state.favorites, listingId],
					}))
					alert('Ошибка при обновлении избранного')
				}
			},

			setShowOnlyFavorites: (value: boolean) =>
				set({ showOnlyFavorites: value }),
		}),
		{ name: 'favorites-storage' }
	)
)
