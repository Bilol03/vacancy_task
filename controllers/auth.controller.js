/**
 * Autentifikatsiya kontrolleri
 * Foydalanuvchilarni ro'yxatdan o'tkazish va tizimga kirish uchun API kontrollerlari
 */
import authService from '../services/auth.service.js'

/**
 * Foydalanuvchini ro'yxatdan o'tkazish
 * @param {Object} req - So'rov obyekti (foydalanuvchi ma'lumotlari bilan)
 * @param {Object} res - Javob obyekti
 */
const register = async (req, res) => {
	let body = req.body
	// Autentifikatsiya xizmatidan foydalanib foydalanuvchini ro'yxatdan o'tkazish
	const userData = await authService.register(body)

	res.status(userData.status).json({
		status: userData.status,
		message: userData.message,

	})
}

/**
 * Foydalanuvchi emailini tasdiqlash
 * @param {Object} req - So'rov obyekti (verification ma'lumotlari bilan)
 * @param {Object} res - Javob obyekti
 */
const verify = async (req, res) => {
    const body = req.body
    const data = await authService.verify(body)

    res.status(data.status).json({
        status: data.status,
        message: data.message
    })
}


/**
 * Foydalanuvchini tizimga kiritish
 * @param {Object} req - So'rov obyekti (login ma'lumotlari bilan)
 * @param {Object} res - Javob obyekti
 */
const login = async (req, res) => {
	let body = req.body
	// Autentifikatsiya xizmatidan foydalanib foydalanuvchini tekshirish
	const userData = await authService.login(body)
	res.status(userData.status).json(userData)
}

export default {
    register,
    verify,
    login
}