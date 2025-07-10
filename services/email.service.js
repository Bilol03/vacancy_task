// services/email.service.js
import nodemailer from 'nodemailer'
import config from '../config/index.js'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.email.email,
		pass: config.email.passwd,
	},
})

export default async (to, code) => {

	const mailOptions = {
		from: config.email.email,
		to,
		subject: 'Email Verification Code',
		html: `<h3>Your verification code is:</h3><h1>${code}</h1>`,
	}

	await transporter.sendMail(mailOptions)
}
