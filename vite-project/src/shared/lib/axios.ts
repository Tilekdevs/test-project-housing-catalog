import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
})

apiClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem('auth-storage')
		if (token) {
			try {
				const parsedToken = JSON.parse(token)
				if (parsedToken?.state?.token) {
					config.headers.Authorization = `Bearer ${parsedToken.state.token}`
				}
			} catch (error) {
				console.warn('Ошибка при парсинге токена:', error)
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
apiClient.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem('auth-storage')
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)

export { BASE_URL }
