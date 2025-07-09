/**
 * Autentifikatsiya validatsiya sxemalari
 * Foydalanuvchi kiritgan ma'lumotlarni tekshirish uchun
 */
import Joi from 'joi';

/**
 * Tizimga kirish uchun validatsiya sxemasi
 * Email va parol maydonlarini tekshiradi
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Iltimos, to\'g\'ri elektron pochta manzilini kiriting',
    'string.empty': 'Elektron pochta bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Elektron pochta talab qilinadi'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
    'string.empty': 'Parol bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Parol talab qilinadi'
  })
});

/**
 * Ro'yxatdan o'tish uchun validatsiya sxemasi
 * Ism, familiya, email va parol maydonlarini tekshiradi
 */
export const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.min': 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak',
    'string.empty': 'Ism bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Ism talab qilinadi'
  }),
  surname: Joi.string().min(2).required().messages({
    'string.min': 'Familiya kamida 2 ta belgidan iborat bo\'lishi kerak',
    'string.empty': 'Familiya bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Familiya talab qilinadi'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Iltimos, to\'g\'ri elektron pochta manzilini kiriting',
    'string.empty': 'Elektron pochta bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Elektron pochta talab qilinadi'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
    'string.empty': 'Parol bo\'sh bo\'lishi mumkin emas',
    'any.required': 'Parol talab qilinadi'
  })
});
