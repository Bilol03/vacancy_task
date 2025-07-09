import { CustomError } from '../errors/custom-error.js';
import { HTTP_STATUS } from '../constants/index.js';
import logger from '../utils/logger.util.js';

/**
 * Umumiy validatsiya middleware fabrikasi
 * Sxema va validatsiya turiga asoslangan validatsiya middleware yaratadi
 * 
 * @param {Object} schema - Tekshirish uchun Joi sxemasi
 * @param {string} type - Validatsiya turi (body, params, query)
 * @returns {Function} - Express middleware funksiyasi
 */
export const validate = (schema, type = 'body') => {
  return async (req, res, next) => {
    try {
      let dataToValidate;
      
      switch (type) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        default:
          dataToValidate = req.body;
      }
      
      const options = {
        abortEarly: false, // Barcha xatolarni o'z ichiga oladi
        allowUnknown: true, // Noma'lum xususiyatlarga ruxsat beradi
        stripUnknown: false // Noma'lum xususiyatlarni olib tashlamaydi
      };
      
      // Ma'lumotlarni sxemaga nisbatan tekshirish
      const { error, value } = schema.validate(dataToValidate, options);
      
      if (error) {
        // Validatsiya xatolarini formatlash
        const errors = error.details.map(detail => detail.message);
        logger.debug('Validation error:', { path: req.path, errors });
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, errors.join(', '));
      }
      
      // So'rov ma'lumotlarini tekshirilgan ma'lumotlar bilan almashtirish
      req[type] = value;
      return next();
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }
      
      logger.error('Kutilmagan validatsiya xatosi:', { error: err });
      return next(new CustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Validatsiya jarayonida ichki server xatosi yuz berdi'));
    }
  };
};
