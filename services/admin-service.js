const { Restaurant, User, Category } = require('../models')
const helpers = require('../helpers/file-helpers')

const adminServices = {
  getRestaurants: cb => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => cb(null, { restaurants }))
      .catch(error => cb(error))
  }
}

exports = module.exports = adminServices
