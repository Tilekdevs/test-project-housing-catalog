import { Link, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import HomePage from '../pages/home/HomePage'
import ListingPage from '../pages/listing/ListingPage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { useEffect } from 'react'

export default function App() {
  const { user, logout } = useAuthStore()
  const { darkMode, toggleDarkMode } = useThemeStore()
  
  useEffect(() => {
    const html = document.documentElement
    if (darkMode) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
          TravelApp
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? 'Светлая тема' : 'Тёмная тема'}
          </button>

          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-200">👋 {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Войти
            </Link>
          )}
        </div>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}
