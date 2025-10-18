import { Link, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import HomePage from '../pages/home/HomePage'
import ListingPage from '../pages/listing/ListingPage'
import { useAuthStore } from './store/useAuthStore'

export default function App() {
	const { user, logout } = useAuthStore()

	return (
		<div>
			<nav
				role='navigation'
				aria-label='Основная навигация'
				className='flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-20'
			>
				<Link
					to='/'
					className='flex items-center gap-2 text-xl font-semibold text-blue-600'
				>
					<span>TravelApp</span>
				</Link>

				<div className='flex items-center gap-3'>
					{user ? (
						<>
							<span className='text-gray-700'>👋 {user.name}</span>
							<button
								onClick={logout}
								className='px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600'
							>
								Выйти
							</button>
						</>
					) : (
						<Link
							to='/login'
							className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
						>
							Войти
						</Link>
					)}
				</div>
			</nav>

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/listing/:id' element={<ListingPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</div>
	)
}
