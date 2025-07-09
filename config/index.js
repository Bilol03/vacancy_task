/**
 * Markazlashtirilgan konfiguratsiya boshqaruvchisi
 * ENV o'zgaruvchilarini yuklaydi va ularga kirishni ta'minlaydi
 */
import { config as dotenvConfig } from 'dotenv';

// ENV o'zgaruvchilarini yuklash
dotenvConfig();

export default {
  server: {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'development',
    apiPrefix: '/api',
    version: 'v1'
  },
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  auth: {
    secretKey: process.env.SECRET_KEY,
    tokenExpiry: '1h',
    algorithm: 'HS256',
    saltRounds: 10
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    filePath: process.env.LOG_FILE || './logs/app.log'
  }
};
