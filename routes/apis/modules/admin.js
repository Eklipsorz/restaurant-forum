const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/apis/admin-controller')

router.delete('/restaurants/:id', adminController.deleteRestaurant) 
router.get('/restaurants', adminController.getRestaurants)
exports = module.exports = router
