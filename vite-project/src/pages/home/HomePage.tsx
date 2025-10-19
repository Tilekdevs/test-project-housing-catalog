"use client"
import { FiltersPanelWidget } from '../../widgets/filters-panel/ui/FiltersPanelWidget'
import { ListingListContainer } from '../../widgets/listing-list/ui/ListingListContainer'

const HomePage = () => {
	return (
		<div className='p-4'>
			<FiltersPanelWidget />
			<ListingListContainer />
		</div>
	)
}

export default HomePage
