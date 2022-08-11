const nodemailer = require('nodemailer')
require('dotenv').config()
const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'roman.girich@meta.ua',
    pass: META_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const emailSender = async (data) => {
  // eslint-disable-next-line
  try {
    const email = { ...data, from: 'roman.girich@meta.ua' }
    await transporter.sendMail(email)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = emailSender
