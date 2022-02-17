const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth')
const userController = require('../../controllers/apis/user-controller')
const restController = require('../../controllers/apis/restaurant-controller')

router.post('/signIn', passport.authenticate('local', { session: false }), userController.signIn)

router.use('/admin', authenticated, authenticatedAdmin, admin)
router.get('/restaurants', authenticated, restController.getRestaurants)
router.use('/', apiErrorHandler)

exports = module.exports = router
