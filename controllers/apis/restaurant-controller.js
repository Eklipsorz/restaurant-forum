const restaurantServices = require('../../services/restaurant-service')

const restaurantController = {
  getRestaurants: (req, res, next) => {
    return restaurantServices.getRestaurants(req, (error, data) => error ? next(error) : res.json(data))
  }

}

exports = module.exports = restaurantController
