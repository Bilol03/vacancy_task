import express from 'express'
import config from './config/index.js'
import {ROUTES} from './constants/index.js'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
const PORT = config.server.port
const api_prefix = ROUTES.API_PREFIX
const api_version = ROUTES.VERSION

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