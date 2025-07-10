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

const verify = async (req, res) => {
    const body = req.body
    const data = await authService.verify(body)

    res.status(data.status).json({
        status: data.status,
        message: data.message
    })
}


export default {
    register,
    verify
}