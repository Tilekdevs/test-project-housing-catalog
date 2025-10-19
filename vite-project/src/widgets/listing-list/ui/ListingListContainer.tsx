import { useState } from 'react'
import { ListingListPaginated } from './ListingListPaginated'
import { ListingListSimple } from './ListingListSimple'

interface ListingListContainerProps {
	className?: string
}

export const ListingListContainer = ({
	className,
}: ListingListContainerProps) => {
	const [loadMode, setLoadMode] = useState<'simple' | 'paginated'>('paginated')

	return (
		<div className={className}>
			{/* Переключатель режимов загрузки */}
			<div className='flex justify-center mb-4'>
				<div className='bg-gray-100 rounded-lg p-1 flex'>
					<button
						onClick={() => setLoadMode('simple')}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							loadMode === 'simple'
								? 'bg-white text-blue-600 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Все сразу
					</button>
					<button
						onClick={() => setLoadMode('paginated')}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							loadMode === 'paginated'
								? 'bg-white text-blue-600 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						По страницам
					</button>
				</div>
			</div>

			{/* Рендерим соответствующий компонент */}
			{loadMode === 'simple' && <ListingListSimple />}
			{loadMode === 'paginated' && <ListingListPaginated />}
		</div>
	)
}
