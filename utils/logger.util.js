

/**
 * Markazlashtirilgan logging utilitasi
 */
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/index.js';

const { combine, timestamp, printf, colorize } = winston.format;

// So'rov ID si bilan maxsus log formati
const logFormat = printf(({ level, message, timestamp, requestId, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
  const reqId = requestId || '-';
  return `${timestamp} [${reqId}] ${level}: ${message} ${metaString}`;
});

// Logger namunasini yaratish
const logger = winston.createLogger({
  level: config.logger.level,
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    // Barcha muhitlar uchun konsol transporti
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    }),
    // Ishlab chiqarish uchun fayl transporti
    new winston.transports.File({
      filename: config.logger.filePath,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// So'rovlarni kuzatish uchun So'rov ID middleware
export const requestIdMiddleware = (req, res, next) => {
  req.requestId = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  next();
};

// HTTP so'rovlari uchun Logger middleware
export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      userAgent: req.headers['user-agent']
    });
  });
  
  next();
};

export default logger;
