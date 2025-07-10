/**
 * Standartlashtirilgan javob formati uchun API Javob utilitasi
 */
import { HTTP_STATUS } from '../constants/index.js';

export const apiResponse = {
  /**
   * Muvaffaqiyatli javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {Object} data - Javob ma'lumotlari
   * @param {String} message - Javob xabari
   * @param {Number} statusCode - HTTP status kodi
   */
  success: (res, data, message = 'Muvaffaqiyatli', statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  },
  
  /**
   * Xatolik javobini qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Xatolik xabari
   * @param {Number} statusCode - HTTP status kodi
   * @param {Object} errors - Qo'shimcha xatolik ma'lumotlari
   */
  error: (res, message = 'Xatolik yuz berdi', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) => {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };
    
    if (errors) {
      response.errors = errors;
    }
    
    return res.status(statusCode).json(response);
  },

  /**
   * Resurs yaratilganligi haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {Object} data - Yaratilgan resurs ma'lumotlari
   * @param {String} message - Javob xabari
   */
  created: (res, data, message = 'Resurs muvaffaqiyatli yaratildi') => {
    return apiResponse.success(res, data, message, HTTP_STATUS.CREATED);
  },

  /**
   * Ma'lumot yo'qligi haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Javob xabari
   */
  noContent: (res, message = 'Ma\'lumot yo\'q') => {
    return res.status(HTTP_STATUS.NO_CONTENT).end();
  },

  /**
   * Resurs topilmaganligi haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Javob xabari
   */
  notFound: (res, message = 'Resurs topilmadi') => {
    return apiResponse.error(res, message, HTTP_STATUS.NOT_FOUND);
  },

  /**
   * Noto'g'ri so'rov haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Javob xabari
   * @param {Object} errors - Qo'shimcha xatolik ma'lumotlari
   */
  badRequest: (res, message = 'Noto\'g\'ri so\'rov', errors = null) => {
    return apiResponse.error(res, message, HTTP_STATUS.BAD_REQUEST, errors);
  },

  /**
   * Ruxsatsiz kirish haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Javob xabari
   */
  unauthorized: (res, message = 'Ruxsatsiz kirish') => {
    return apiResponse.error(res, message, HTTP_STATUS.UNAUTHORIZED);
  },

  /**
   * Kirish taqiqlanganligi haqida javob qaytarish
   * @param {Object} res - Express javob obyekti
   * @param {String} message - Javob xabari
   */
  forbidden: (res, message = 'Kirish taqiqlangan') => {
    return apiResponse.error(res, message, HTTP_STATUS.FORBIDDEN);
  }
};
