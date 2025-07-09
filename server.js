import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { sequelize } from './config/db.config.js'
import config from './config/index.js'
import swaggerSpec from './config/swagger.config.js'
import { ROUTES } from './constants/index.js'
import logger from './utils/logger.util.js'
const app = express()
const PORT = config.server.port
const apiPrefix = ROUTES.API_PREFIX
const apiVersion = ROUTES.VERSION
const apiPath = `${apiPrefix}/${apiVersion}`

// Xavfsizlik middleware
app.use(helmet())
app.use(cors())

// So'rov tanasini tahlil qiluvchi middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger hujjatlarini sozlash
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerSpec))

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(swaggerSpec)
})


logger.info('All routes mounted successfully')

// Aniqlanmagan yo'nalishlar uchun xavfsizroq 404 xatolik ishlovchisini aniqlash
app.use((req, res, next) => {
  if (!res.headersSent) {
    logger.info(`Route not found: ${req.method} ${req.originalUrl}`)
    apiResponse.notFound(res, `Route not found: ${req.method} ${req.originalUrl}`)
  }
})

// Xatoliklarni qayta ishlash middleware - yaxshilangan xatoliklarni qayd qilish bilan
app.use((err, req, res, next) => {
  logger.error('Express error handler caught:', { error: err.message, stack: err.stack })
  if (!res.headersSent) {
    apiResponse.error(res, 'An unexpected error occurred')
  }
})


const startServer = async () => {
	try {
		await sequelize.sync()
		logger.info('Connected to database successfully')

		const server = app.listen(PORT, async () => {
			logger.info(`Server is running on port http://localhost:${PORT}`)
			logger.info(
				`Swagger documentation available at http://localhost:${PORT}/api-docs`,
			)
			logger.info(
				`API endpoints available at http://localhost:${PORT}${apiPath}`,
			)
		})

		// Xavfsiz o'chirish ishlovchisi
		const gracefulShutdown = () => {
			logger.info('Received shutdown signal, closing connections...')

			server.close(() => {
				logger.info('HTTP server closed')

				// Ma'lumotlar bazasi ulanishini yopish
				sequelize
					.close()
					.then(() => {
						logger.info('Database connections closed')
						process.exit(0)
					})
					.catch((err) => {
						logger.error('Error closing database connections', {
							error: err,
						})
						process.exit(1)
					})

				// Agar ulanishlar 10 soniya ichida yopilmasa, majburiy o'chirish
				setTimeout(() => {
					logger.error(
						'Could not close connections in time, forcing shutdown',
					)
					process.exit(1)
				}, 10000)
			})
		}

		// Xavfsiz o'chirish uchun signal ishlovchilarini o'rnatish
		process.on('SIGTERM', gracefulShutdown)
		process.on('SIGINT', gracefulShutdown)

		// Tutilmagan istisnolar va ishlanmagan rad etishlarni qayta ishlash
		process.on('uncaughtException', (error) => {
			logger.error('Uncaught Exception:', { error })
			// Allow logs to be written before exiting
			setTimeout(() => {
				process.exit(1)
			}, 1000)
		})

		process.on('unhandledRejection', (reason) => {
			logger.error('Unhandled Rejection:', { reason })
			// Allow logs to be written before exiting
			setTimeout(() => {
				process.exit(1)
			}, 1000)
		})
	} catch (err) {
		logger.error('Failed to start server:', { err })
		process.exit(1)
	}
}

startServer()
