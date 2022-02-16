const adminServices = require('../../services/admin-service')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants((error, data) =>
      error ? next(error) : res.json({ status: 'success', data })
    )
  },
  deleteRestaurant: (req, res, next) => {
    adminServices.deleteRestaurant(req, (error, data) =>
      error ? next(error) : res.json({ status: 'success', data })
    )
  },
  postRestaurant: (req, res, next) => {
    adminServices.postRestaurant(req, (error, data) =>
      error ? next(error) : res.json({ status: 'success', data })
    )
  }
}

exports = module.exports = adminController
