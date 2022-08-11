const { basedir } = global

const { User, schemas } = require(`${basedir}/models/user`)

const { createError, emailSender } = require(`${basedir}/helpers`)

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const { error } = schemas.email.validate({ email })
  if (error) {
    throw createError(400, error.message)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw createError(404)
  }
  if (user.verify) {
    throw createError(400, 'Verification has already been passed')
  }
  const mail = {
    to: email,
    subject: 'Please verify your registration on our website',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click this link for your verification approval </a>`,
  }
  await emailSender(mail)
  res.json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail
