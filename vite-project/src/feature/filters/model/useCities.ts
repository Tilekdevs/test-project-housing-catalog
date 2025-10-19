import { useEffect, useState } from 'react'
import { listingsApi } from '../../../entities/listing/model/listingsApi'
import type { Listing } from '../../../entities/listing/model/types'
import { getUniqueValues } from '../../../shared/lib/utils'

export const useCities = () => {
	const [cities, setCities] = useState<string[]>([])

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const listings: Listing[] = await listingsApi.getListings({})
				const uniqueCities = getUniqueValues(listings, 'city').sort()
				setCities(uniqueCities)
			} catch (err) {
				console.error('Ошибка при загрузке городов:', err)
			}
		}

		fetchCities()
	}, [])

	return cities
}
