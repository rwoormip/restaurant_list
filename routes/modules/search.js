const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keywords = req.query.keywords.trim()
  const keyword = keywords.toLowerCase()

  if (!keyword) {
    return res.redirect('/')
  }

  return Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        restaurant => restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurants, keywords })
    })
    .catch(error => console.log(error))
})

module.exports = router