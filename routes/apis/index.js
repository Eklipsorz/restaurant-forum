const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')

const userController = require('../../controllers/apis/user-controller')
const restController = require('../../controllers/apis/restaurant-controller')

router.use('/admin', admin)

router.post('/signIn', passport.authenticate('local', { session: false }), userController.signIn)

router.get('/restaurants', restController.getRestaurants)
router.use('/', apiErrorHandler)

exports = module.exports = router
