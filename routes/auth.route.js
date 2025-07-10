/**
 * Autentifikatsiya yo'nalishlari
 * Foydalanuvchilarni ro'yxatdan o'tkazish va tizimga kirish uchun API yo'nalishlari
 */
import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validation.middleware.js'
import { registerSchema, loginSchema} from '../validators/auth.validation.js'

// Express yo'naltirgichini yaratish
const router = Router()

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's first name
 *               surname:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *     responses:
 *       200:
 *         description: Verification  code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Verification code sent successfully
 *       400:
 *         description: Bad request - validation error
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
// Ro'yxatdan o'tish yo'nalishi - validatsiya va kontroller bilan
router.post('/register', validate(registerSchema), AuthController.register)
/**
 * @swagger
 * /api/v1/auth/verify:
 *   post:
 *     summary: Verify email
 *     description: Verify new user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               code:
 *                 type: number
 *                 format: int32
 *                 description: User's verification code (6 digits)
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully registered
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request - validation error
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
// Verify email
router.post('/verify', AuthController.verify)



/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login to the system
 *     description: Authenticate a user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     userData:
 *                       type: object
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Authentication failed
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
// Tizimga kirish yo'nalishi - validatsiya va kontroller bilan
router.post('/login', validate(loginSchema), AuthController.login)

// Yo'naltirgichni eksport qilish
export default router
