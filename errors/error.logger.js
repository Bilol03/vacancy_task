/**
 * Xatoliklarni qayd qilish utilitasi
 * Xatoliklarni konsol va faylga yozish uchun
 */
import { createLogger, transports, format } from "winston";

// Xatoliklarni qayd qiluvchi obyektni yaratish
const logger = createLogger({
  level: 'error', // Faqat xatolik darajasidagi xabarlarni qayd qilish
  // Log formatini sozlash
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message} `)
  ),
  // Log transportlarini sozlash
  transports: [
    new transports.Console(), // Konsolga chiqarish
    new transports.File({ filename: 'logs/error.log' }) // Faylga yozish
  ]
});

export {logger}

