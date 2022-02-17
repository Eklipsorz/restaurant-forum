
const fileHelpers = require('../../helpers/file-helpers')
const authHelpers = require('../../helpers/auth-helpers')
const jwt = require('jsonwebtoken')
const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = authHelpers.getUser(req).toJSON()
      delete userData.password

      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })

      return res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (error) {
      return next(error)
    }
  }
}

exports = module.exports = userController
