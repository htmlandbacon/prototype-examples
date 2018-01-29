const express = require('express')

const router = new express.Router()

// base route - render the page with js removed
router.get('/add-to-a-list-no-js', function (req, res) {
  res.render('patterns/add-to-a-list/main.njk')
})

// base route render the page with js enabled
router.get('/add-to-a-list', function (req, res) {
  res.render('patterns/add-to-a-list/main.njk', {javascript: true})
})

// post to view data
router.post('/add-to-a-list-review', function (req, res) {
  res.render('patterns/add-to-a-list/review.njk', {form: req.body})
})

// paramters example - magic version
router.get('/query-example-magic', function (req, res) {
  res.render('examples/example3.njk', {data: req.query})
})

// get/post example
router.get('/get-to-post', function (req, res) {
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url})
})

// get/post example
router.post('/get-to-post', function (req, res) {
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url, name: req.body.name})
})

// get/post example
router.all('/all', function (req, res) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase()
  }
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url, name: req.body.name})
})

module.exports = router
