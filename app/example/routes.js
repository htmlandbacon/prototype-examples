const express = require('express')

const router = new express.Router()

// first page
router.get('/start', function (req, res) {
  res.render('examples/example/start.njk')
})

// second page with name collection
router.all('/what-is-your-name', function (req, res) {
  let error = {}
  // this is a route all, so when we get a post, we save the session and redirect them
  if (req.method === 'POST' && req.body.name !== '') {
    req.session.name = req.body.name
    res.redirect('/example/what-is-your-email')
  } else {
    if (req.method === 'POST' && req.body.name === '') {
      error.name = 'Required Field.'
    }
    res.render('examples/example/name.njk', {error: error, name: req.session.name})
  }
})

// third page with email collection
router.get('/what-is-your-email', function (req, res) {
  res.render('examples/example/email.njk', {email: req.session.email})
})

// we have a seperate route here to deal with the form post
router.post('/what-is-your-email', function (req, res) {
  if (req.body.email === '') {
    let error = {}
    error.email = 'Required Field.'
    res.render('examples/example/email.njk', {error: error, email: req.session.email})
  } else {
    req.session.email = req.body.email
    res.redirect('/example/are-you-over-18')
  }
})

// this takes a var and does a redirect we could also say that
// if body.age === yes redirect
router.all('/are-you-over-18', function (req, res) {
  if (req.body.age === undefined) {
    let error = {}
    if (req.method === 'POST' && req.body.age === undefined) {
      error.age = 'Required Field.'
    }
    res.render('examples/example/over-18.njk', {error: error, age: req.session.age})
  } else {
    req.session.age = req.body.age
    if (req.body.age === 'yes') {
      res.redirect('/example/review')
    } else {
      res.redirect('/example/what-is-your-parents-name')
    }
  }
})

router.all('/what-is-your-parents-name', function (req, res) {
  if (req.body.surname === undefined) {
    res.render('examples/example/parent.njk', {surname: req.session.surname})
  } else {
    req.session.surname = req.body.surname
    res.redirect('/example/review')
  }
})

// review page
router.get('/review', function (req, res) {
  let data = {}
  data.email = req.session.email
  data.name = req.session.name
  data.age = req.session.age
  data.surname = req.session.surname
  res.render('examples/example/review.njk', data)
})

module.exports = router
