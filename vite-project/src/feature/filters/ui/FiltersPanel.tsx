"use client"
import { useState } from 'react'
import { useCities } from '../model/useCities'
import { useFilters } from '../model/useFilters'

export const FiltersPanel = () => {
	const { filters, favorites, applyFilters, resetFilters } = useFilters()
	const cities = useCities()

	const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || 0)
	const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || 0)
	const [localMinRating, setLocalMinRating] = useState(filters.minRating || 0)

	return (
		<div className='p-6 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 '>
			<div className='flex flex-wrap gap-4 items-end'>
				<div className='flex flex-col'>
					<label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Город
					</label>
					<select
						value={filters.city || ''}
						onChange={e => filters.setCity(e.target.value)}
						className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
					>
						<option value=''>Все города</option>
						{cities.map(c => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Цена
					</label>
					<div className='flex gap-2'>
						<input
							type='number'
							placeholder='Мин'
							value={localMinPrice || ''}
							onChange={e => setLocalMinPrice(Number(e.target.value))}
							className='w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
						/>
						<input
							type='number'
							placeholder='Макс'
							value={localMaxPrice || ''}
							onChange={e => setLocalMaxPrice(Number(e.target.value))}
							className='w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
						/>
					</div>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Рейтинг
					</label>
					<input
						type='number'
						placeholder='Мин. рейтинг'
						value={localMinRating || ''}
						onChange={e => setLocalMinRating(Number(e.target.value))}
						className='w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
					/>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Сортировка
					</label>
					<select
						value={filters.sort || ''}
						onChange={e => filters.setSort(e.target.value as any)}
						className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
					>
						<option value=''>Без сортировки</option>
						<option value='price_asc'>Цена ↑</option>
						<option value='price_desc'>Цена ↓</option>
						<option value='rating_desc'>Рейтинг ↓</option>
					</select>
				</div>

				<div className='flex flex-col'>
					<label className='flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300'>
						<input
							type='checkbox'
							checked={favorites.showOnlyFavorites}
							onChange={e => favorites.setShowOnlyFavorites(e.target.checked)}
							className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						Только избранные
					</label>
				</div>
				<div className='flex gap-2'>
					<button
						onClick={() =>
							applyFilters({
								minPrice: localMinPrice,
								maxPrice: localMaxPrice,
								minRating: localMinRating,
							})
						}
						className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						Применить
					</button>
					<button
						onClick={() => {
							resetFilters()
							setLocalMinPrice(0)
							setLocalMaxPrice(0)
							setLocalMinRating(0)
						}}
						className='px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						Сбросить
					</button>
				</div>
			</div>
		</div>
	)
}
