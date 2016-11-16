const express = require('express')

const router = new express.Router()

router.get('/get-to-post', function (req, res) {
  let formData = {}
  if (req.session.data) {
    formData = req.session.data.formData
  }
  res.render('examples/example5.njk', {type: req.method, url: req.baseUrl + req.url, formData: formData})
})

// get/post example
router.post('/get-to-post', function (req, res) {
  let formData = req.body
  req.session.data = {formData: formData}
  res.redirect(req.baseUrl + req.url)
})

// preloaded example
router.get('/details', function (req, res) {
  let userData = {}
  if (req.session.data !== undefined) {
    userData = req.session.data.userData
  }
  res.render('examples/example6.njk', {userData: userData})
})

// preloaded example
router.get('/details-advanced', function (req, res) {
  let radio = ''
  if (req.session.data !== undefined) {
    radio = req.session.data.radio
  }
  res.render('examples/example7.njk', {radio: radio})
})

module.exports = router
