const { Restaurant, User, Category } = require('../models')
const helpers = require('../helpers/file-helpers')

const adminServices = {
  getRestaurants: cb => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => cb(null, { restaurants }))
      .catch(error => cb(error))
  },
  deleteRestaurant: (req, cb) => {
    const { id } = req.params

    return Restaurant.findByPk(id)
      .then(restaurant => {
        if (!restaurant) throw new Error('Restaurant didn\'t exist')
        return restaurant.destroy()
      })
      .then(deletedRestaurant => cb(null, { restaurant: deletedRestaurant }))
      .catch(error => cb(error))
  }
}

exports = module.exports = adminServices
