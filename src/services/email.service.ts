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


async function main() {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "andrewkhorsun@gmail.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>ЭТО ПИСЬМО ОТПРАВИЛ ТЕБЕ С СЕРВЕРНОГО ПРИЛОЖЕНИЯ)</b>", 
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error)