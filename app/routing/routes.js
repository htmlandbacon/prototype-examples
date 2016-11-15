const express = require('express')
const router = express.Router()

// paramters example - changing the end of the url will update the variable being passed to the template
router.get('/params-single/:single', function (req, res) {
  res.render('examples/example1.njk', {variable: req.params.single});
})


// paramters example - current there is two fixed values being passed to the view
router.get('/query-example', function (req, res) {
  res.render('examples/example2.njk', {variable1: req.query.welcome, variable2: req.query.user});
})

// paramters example - magic version
router.get('/query-example-magic', function (req, res) {
  res.render('examples/example3.njk', {data: req.query});
})

// get/post example
router.get('/get-to-post', function (req, res) {
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url});
})

// get/post example
router.post('/get-to-post', function (req, res) {
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url, name: req.body.name});
})


// get/post example
router.all('/all', function (req, res) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  res.render('examples/example4.njk', {type: req.method, url: req.baseUrl + req.url, name: req.body.name});
})

module.exports = router
