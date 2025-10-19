import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (listingId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (value: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      showOnlyFavorites: false,

      async loadFavorites() {
        const { token } = useAuthStore.getState();
        if (!token) {
          console.warn("loadFavorites: пользователь не авторизован");
          return;
        }

        try {
          const res = await axios.get("http://localhost:4000/me/favorites", {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: (status) => status >= 200 && status < 500,
          });

          if (res.status === 401) {
            console.warn("Токен недействителен, нужно повторно войти");
            return;
          }

          if (Array.isArray(res.data)) {
            set({ favorites: res.data });
          }
        } catch (error) {
          console.error("Ошибка загрузки избранного:", error);
        }
      },

      async toggleFavorite(listingId) {
        const { token } = useAuthStore.getState();
        if (!token) {
          alert("Нужно войти, чтобы добавлять в избранное");
          return;
        }

        set((state) => {
          const isFav = state.favorites.includes(listingId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== listingId)
              : [...state.favorites, listingId],
          };
        });

        try {
          const res = await axios.post(
            `http://localhost:4000/me/favorites/${listingId}/toggle`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const { isFavorite } = res.data;
          set((state) => ({
            favorites: isFavorite
              ? [...new Set([...state.favorites, listingId])]
              : state.favorites.filter((id) => id !== listingId),
          }));
        } catch (error) {
          console.error("Ошибка при обновлении избранного:", error);
          alert("Ошибка при обновлении избранного");
        }
      },

      setShowOnlyFavorites: (value: boolean) => set({ showOnlyFavorites: value }),
    }),
    { name: "favorites-storage" }
  )
);
