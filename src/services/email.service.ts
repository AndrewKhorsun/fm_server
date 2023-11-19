import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as never)

interface EmailBody {
  email: string
  subject: string
  html: string
}

const send = ({ email, subject, html }: EmailBody) => {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  })
}

const sendActivationEmail = (email: string, token: string) => {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`
  const html = `
  <h1>Activate account</h1>
  <a href="${href}">${href}</a>
  `
  return send({ email, html, subject: 'Activate' })
}

export const emailService = {
  sendActivationEmail,
  send,
}
