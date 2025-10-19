export const formatDate = (date: string | Date): string => {
	const d = new Date(date)
	return d.toLocaleDateString('ru-RU')
}

export const isDateInRange = (
	date: string,
	startDate: string,
	endDate: string
): boolean => {
	const checkDate = new Date(date)
	const start = new Date(startDate)
	const end = new Date(endDate)
	return checkDate >= start && checkDate <= end
}

export const buildSearchParams = (
	params: Record<string, any>
): URLSearchParams => {
	const searchParams = new URLSearchParams()
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			searchParams.append(key, String(value))
		}
	})
	return searchParams
}

export const getUniqueValues = <T>(array: T[], key: keyof T): T[keyof T][] => {
	return Array.from(new Set(array.map(item => item[key]))).filter(Boolean)
}
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
	try {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : defaultValue
	} catch {
		return defaultValue
	}
}

export const setToStorage = <T>(key: string, value: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.warn('Ошибка при сохранении в localStorage:', error)
	}
}
