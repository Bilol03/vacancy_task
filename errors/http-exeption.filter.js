import { CustomError } from './custom-error.js'
import logger from '../utils/logger.util.js'
import { apiResponse } from '../utils/response.util.js'
import { HTTP_STATUS } from '../constants/index.js'
import config from '../config/index.js'

/**
 * Global xatoliklarni qayta ishlash middleware
 */
const errorHandler = (err, req, res, next) => {
	// Status kod va xabarni aniqlash
	const statusCode = err instanceof CustomError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR
	const message = err.message || 'Internal Server Error'
	
	// Qayd qilish uchun qo'shimcha xatolik ma'lumotlari
	const errorDetails = {
		method: req.method,
		url: req.originalUrl,
		statusCode,
		requestId: req.requestId,
		stack: err.stack
	}
	
	// Xatolikni batafsil kontekst bilan qayd qilish
	logger.error(`${req.method} ${req.originalUrl} >> ${message}`, errorDetails)
	
	// Ishlab chiqish muhitida javob uchun xatolik tafsilotlarini tayyorlash
	let errorResponse = null
	if (config.server.env === 'development') {
		errorResponse = {
			stack: err.stack,
			...err
		}
	}
	
	// Standartlashtirilgan xatolik javobini yuborish
	return apiResponse.error(res, message, statusCode, errorResponse)
}

export { errorHandler }
