const paginatorHelpers = require('../helpers/pagination-helpers')
const authHelpers = require('../helpers/auth-helpers')
const { Restaurant, Category } = require('../models')

const restaurantServices = {
  getRestaurants: (req, cb) => {
    // obtain current category
    const categoryId = Number(req.query.categoryId) || ''
    // define where condition for SQL
    const where = {}
    if (categoryId) where.categoryId = categoryId

    // define paginator setting
    const DEFAULT_LIMIT = 9
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const currentPage = Number(req.query.page) || 1
    const offset = paginatorHelpers.getOffset(DEFAULT_LIMIT, currentPage)

    return Promise.all([
      Category.findAll({ raw: true }),
      Restaurant.findAndCountAll({
        raw: true,
        nest: true,
        where,
        limit,
        offset,
        include: [Category]
      })
    ])
      .then(([categories, restaurants]) => {
        const count = restaurants.count
        const user = authHelpers.getUser(req)
        // obtain a favorite list for each user
        const favoriteList = user?.FavoritedRestaurants
          ? user.FavoritedRestaurants.map(fr => (fr.id))
          : []
        // obtain a like list for each user
        const likeList = user?.LikedRestaurants
          ? user.LikedRestaurants.map(lr => lr.id)
          : []

        const data = restaurants.rows.map(r => ({
          ...r,
          description: r.description.substring(0, 50),
          // determine which restaurant is favorited or liked ?
          isFavorited: favoriteList.includes(r.id),
          isLiked: likeList.includes(r.id)
        }))
        return cb(null, {
          restaurants: data,
          categories,
          categoryId,
          pagination: paginatorHelpers.getPagination(limit, currentPage, count)
        })
      })
      .catch(error => cb(error))
  }
}

exports = module.exports = restaurantServices
