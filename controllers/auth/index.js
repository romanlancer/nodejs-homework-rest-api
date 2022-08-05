const register = require('./register')
const login = require('./login')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const setAvatar = require('./setAvatar')
const updateUserSubscription = require('./updateUserSubscription')

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  setAvatar,
}
