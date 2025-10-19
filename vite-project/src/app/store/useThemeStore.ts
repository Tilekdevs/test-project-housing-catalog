import { create } from 'zustand'

interface ThemeState {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: typeof window !== 'undefined' 
    ? !!JSON.parse(localStorage.getItem('darkMode') || 'false')
    : false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode
      localStorage.setItem('darkMode', JSON.stringify(newMode))
      return { darkMode: newMode }
    }),
}))
