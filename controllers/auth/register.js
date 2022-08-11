const bcrypt = require('bcryptjs')

const gravatar = require('gravatar')
const { v4: uuid } = require('uuid')
const { basedir } = global

const { User, schemas } = require(`${basedir}/models/user`)

const { createError, emailSender } = require(`${basedir}/helpers`)

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body)
  if (error) {
    throw createError({ status: 400, message: error.message })
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw createError({ status: 409, message: `${email} already exist` })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationToken = uuid()
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  })

  const mail = {
    to: email,
    subject: 'Please verify your registration on our website',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click this link for your verification approval </a>`,
  }
  await emailSender(mail)
  res.status(201).json({
    name: result.username,
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = register
