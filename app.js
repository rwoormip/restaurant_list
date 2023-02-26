const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find({})
  .lean()
  .sort({ name: 'asc'})
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, location, phone, rating, description, image, google_map } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      restaurant.image = image
      restaurant.google_map = google_map
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})