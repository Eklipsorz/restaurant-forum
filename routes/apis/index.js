const express = require('express')
const router = express.Router()

const restController = require('../../controllers/apis/restaurant-controller')

router.get('/restaurants', restController.getRestaurants)

exports = module.exports = router