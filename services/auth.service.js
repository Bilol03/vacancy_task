import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CustomError } from '../errors/custom-error.js'
import { User } from '../models/user.model.js'
import config from '../config/index.js'
import { AUTH, HTTP_STATUS } from '../constants/index.js'
import logger from '../utils/logger.util.js'
import generateCode from '../utils/generateCode.js'
import { redisClient } from '../config/redis.config.js'
import sendVerificationEmail from './email.service.js'

const register = async (body) => {
	try {
		let { name, surname, email, password } = body
		const code = generateCode()
		// Check if user already exists
		const user = await User.findOne({ where: { email } })
		if (user) return {status: HTTP_STATUS.BAD_REQUEST, message: "Email already exists"}

		// Hash password with secure salt rounds from config
		password = await bcrypt.hash(password, config.auth.saltRounds)
        const userData = {name, surname, password, code}
        await redisClient.setEx(`verify:${email}`, 300, JSON.stringify(userData))
        await sendVerificationEmail(email, code)
        // Send message to developer
		return {status: HTTP_STATUS.OK, message: "Verification code has been sent"}

	} catch (error) {
		logger.error('Error in register service:', { error })
		throw error
	}
}

const verify = async (body) => {
    const {email, code} = body
    const userData = await redisClient.get(`verify:${email}`)
    console.log(userData);
    if(!userData) return {status: 400, message: "Your code is expired please try again!"}

    const parsed = JSON.parse(userData)
    if(parsed.code != code) return {status: 400, message: "Wrong verification code"}
    
    const newUser = await User.create({email, password: parsed.password, name: parsed.name, surname: parsed.surname})
    await redisClient.del(`verify:${email}`)

    return {status: 201, message: "Success", newUser}
}

export default {
    register, 
    verify
}