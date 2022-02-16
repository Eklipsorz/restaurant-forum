const adminServices = require('../../services/admin-service')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants((error, data) =>
      error ? next(error) : res.json({ status: 'success', data })
    )
  },
  deleteRestaurant: (req, res, next) => {
    console.log('hi')
    adminServices.deleteRestaurant(req, (err, data) =>
      err ? next(err) : res.json({ status: 'success', data })
    )
  }
}

exports = module.exports = adminController
