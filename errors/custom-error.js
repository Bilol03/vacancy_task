/**
 * Maxsus xatolik sinfi
 * HTTP status kodlari bilan xatoliklarni yaratish uchun
 */
class CustomError extends Error {
    /**
     * Maxsus xatolik konstruktori
     * @param {number} statusCode - HTTP status kodi
     * @param {string} message - Xatolik xabari
     */
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export {CustomError}
  