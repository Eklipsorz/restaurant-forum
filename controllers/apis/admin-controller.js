const adminServices = require('../../services/admin-service')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants((error, data) => error ? next(error) : res.json(data))
  }
}

exports = module.exports = adminController
