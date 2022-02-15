
const authHelpers = require('../../helpers/auth-helpers')
const restaurantServices = require('../../services/restaurant-service')
const { Restaurant, Category, User, Comment } = require('../../models')

const restaurantController = {
  getRestaurants: (req, res, next) => {
    return restaurantServices.getRestaurants(req, (error, data) => error ? next(error) : res.render('restaurants', data))
  },
  getRestaurant: (req, res, next) => {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      nest: true,
      include: [
        Category,
        { model: Comment, include: User },
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' }
      ]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('Restaurant doesn\'t exist')
        return restaurant.increment('viewCounts')
      })
      .then(restaurant => {
        const userId = authHelpers.getUserId(req)
        // determine whether current restaurant is favorited or liked?
        const isFavorited = restaurant.FavoritedUsers.some(fr => fr.id === userId)
        const isLiked = restaurant.LikedUsers.some(lr => lr.id === userId)
        return res.render('restaurant', {
          restaurant: restaurant.toJSON(),
          isLiked,
          isFavorited
        })
      })
      .catch(error => next(error))
  },
  getDashboard: (req, res, next) => {
    const id = req.params.id
    return Restaurant.findByPk(id, { include: [Category] })
      .then(restaurant => {
        if (!restaurant) throw new Error('Restaurant doesn\'t exist')
        restaurant = restaurant.toJSON()
        res.render('dashboard', { restaurant })
      })
  },
  getFeeds: (req, res, next) => {
    return Promise.all([
      Restaurant.findAll({
        raw: true,
        nest: true,
        include: Category,
        limit: 10,
        order: [
          ['createdAt', 'DESC']
        ]
      }),
      Comment.findAll({
        raw: true,
        nest: true,
        limit: 10,
        include: [User, Restaurant],
        order: [
          ['createdAt', 'DESC']
        ]
      })
    ])
      .then(([restaurants, comments]) => {
        return res.render('feeds', { restaurants, comments })
      })
      .catch(error => next(error))
  },
  // Render Top 10 restaurants
  getTopRestaurants: (req, res, next) => {
    const DEFAULT_MAX_TOP_NUMBER = 10

    return Restaurant.findAll({
      include: [
        { model: User, as: 'FavoritedUsers' }
      ]
    })
      .then(restaurants => {
        const userId = authHelpers.getUserId(req)
        const results = restaurants
          .map(restaurant => ({
            ...restaurant.toJSON(),
            isFavorited: restaurant.FavoritedUsers.some(fu => fu.id === userId),
            favoritedCount: restaurant.FavoritedUsers.length,
            description: restaurant.description.substring(0, 50)
          }))
          .sort((a, b) => b.favoritedCount - a.favoritedCount)
          .slice(0, DEFAULT_MAX_TOP_NUMBER)

        return res.render('top-restaurants', { restaurants: results })
      })
      .catch(error => next(error))
  }
}

exports = module.exports = restaurantController
